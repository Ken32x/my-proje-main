import formidable from "formidable";
import fs from "fs";
import path from "path";
import Cors from "cors";

// CORS Ayarları
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // Dev ortamı için izin verilen adresler
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS'u çalıştır
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const saveFile = async (file) => {
  const filePath = path.join(uploadDir, file.originalFilename);
  const data = fs.readFileSync(file.filepath);

  fs.writeFileSync(filePath, data);
  fs.unlinkSync(file.filepath);

  return `/uploads/${file.originalFilename}`;
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parse error" });
    }

    try {
      const fileUrl = await saveFile(files.file);
      return res.status(200).json({ url: fileUrl });
    } catch (error) {
      console.error("Dosya kaydetme hatası:", error);
      return res.status(500).json({ error: "Dosya kaydetme hatası" });
    }
  });
}
