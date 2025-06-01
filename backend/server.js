const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

// Middleware
app.use(cors());
app.use(express.json());

// Statik dosya erişimi (görselleri göstermek için)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/galeri', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB'ye başarıyla bağlanıldı");
})
.catch(err => {
  console.error("❌ MongoDB bağlantı hatası:", err);
});

// Model tanımı
const Resim = mongoose.model('Resim', {
  ad: String,
  url: String,
  yuklenmeTarihi: Date
});

// Basit API testi
app.get('/api/data', (req, res) => {
  res.json({ message: 'Express backend çalışıyor 🎉' });
});

// ✅ GET /api/resimler → MongoDB'den tüm resimleri çek
app.get('/api/resimler', async (req, res) => {
  try {
    const tumResimler = await Resim.find().sort({ yuklenmeTarihi: -1 });
    res.json(tumResimler);
  } catch (err) {
    console.error("❌ Resim listeleme hatası:", err);
    res.status(500).json({ error: 'Veriler getirilemedi', detail: err.message });
  }
});

// (İsteğe bağlı) JSON ile kayıt - kullanmıyorsan silebilirsin
app.post('/api/yukle', async (req, res) => {
  try {
    const yeniResim = new Resim({
      ad: req.body.ad,
      url: req.body.url,
      yuklenmeTarihi: new Date()
    });

    await yeniResim.save();
    res.json({ message: '📸 Resim başarıyla kaydedildi' });
  } catch (err) {
    console.error("❌ Kayıt hatası:", err);
    res.status(500).json({ error: 'Kayıt başarısız', detail: err.message });
  }
});

// ✅ POST /api/upload → Gerçek dosya yükleme + MongoDB kaydı
app.post('/api/upload', (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, '../uploads'),
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Form parse hatası:", err);
      return res.status(500).json({ error: 'Form verisi işlenemedi' });
    }

    const dosyalar = Array.isArray(files.files) ? files.files : [files.files];

    try {
      for (let dosya of dosyalar) {
        const yeniResim = new Resim({
          ad: dosya.originalFilename,
          url: `/uploads/${dosya.newFilename}`,
          yuklenmeTarihi: new Date()
        });
        await yeniResim.save();
      }

      res.json({
        message: '✅ Dosyalar başarıyla kaydedildi ve MongoDB’ye işlendi',
        adet: dosyalar.length
      });

    } catch (dbErr) {
      console.error("❌ MongoDB kayıt hatası:", dbErr);
      res.status(500).json({ error: 'Veritabanına kayıt başarısız' });
    }
  });
});

// Sunucu başlat
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend http://localhost:${PORT} adresinde çalışıyor`);
});

