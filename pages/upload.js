import React, { useRef, useState } from "react";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleFileClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);
    setMessage("");
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Lütfen en az bir dosya seçin.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Dosyalar başarıyla yüklendi.`);
        setFiles([]);
        console.log("Yüklenen dosyalar:", data);
      } else {
        setMessage(`Yükleme hatası: ${data.error}`);
      }
    } catch (err) {
      console.error("İstek hatası:", err);
      setMessage("Dosya yükleme başarısız.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header" onClick={handleFileClick}>
        <img src="/upload.jpg" alt="Yükleme Bilgilendirmesi" className="info-image" />
        <h2>Lütfen Resimleri Yükleyin</h2>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        multiple 
        ref={inputRef} 
        style={{ display: "none" }} 
        onChange={handleFileChange} 
      />

      <div className="file-list">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className="file-item">
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Seçilen ${index}`} 
                className="preview-image" 
              />
              <button className="remove-button" onClick={() => handleRemoveFile(index)}>
                Sil
              </button>
            </div>
          ))
        ) : (
          <p className="no-files">Henüz dosya seçilmedi.</p>
        )}
      </div>

      <button className="upload-button" onClick={handleUpload} disabled={files.length === 0}>
        Yükle
      </button>

      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default Upload;
