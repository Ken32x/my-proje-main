import React, { useState, useRef, useEffect } from 'react';
import TopbarPanel from "@/components/TopbarPanel";

const Panel = () => {
  const [photos, setPhotos] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Fotoğraf ${i + 1}`,
      date: `2025-05-${String(i % 30).padStart(2, '0')}`,
      url: null,
    }))
  );

  const [videos, setVideos] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Video ${i + 1}`,
      date: `2025-05-${String(i % 30).padStart(2, '0')}`,
      url: null,
    }))
  );

  // ✅ Next.js API'den gelen resimleri/videoları çek
  useEffect(() => {
    fetch('/api/resimler')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.error("❌ API'den dizi bekleniyordu ama gelen:", data);
          return;
        }

        const imageFiles = data.filter(item =>
          item.url.endsWith('.jpg') || item.url.endsWith('.jpeg') || item.url.endsWith('.png')
        );

        const videoFiles = data.filter(item =>
          item.url.endsWith('.mp4') || item.url.endsWith('.mov') || item.url.endsWith('.webm')
        );

        setPhotos(prev => [
          ...imageFiles.map((item, index) => ({
            id: prev.length + index + 1,
            name: item.ad,
            date: new Date(item.yuklenmeTarihi).toISOString().slice(0, 10),
            url: `http://localhost:3000${item.url}`
          })),
          ...prev
        ]);

        setVideos(prev => [
          ...videoFiles.map((item, index) => ({
            id: prev.length + index + 1,
            name: item.ad,
            date: new Date(item.yuklenmeTarihi).toISOString().slice(0, 10),
            url: `http://localhost:3000${item.url}`
          })),
          ...prev
        ]);
      })
      .catch(err => console.error("❌ Veri çekme hatası:", err));
  }, []);

  const handlePhotoUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const newPhotos = photos.map((photo) => {
        if (photo.id === id) {
          return { ...photo, url: URL.createObjectURL(file) };
        }
        return photo;
      });
      setPhotos(newPhotos);
    }
  };

  const handleVideoUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const newVideos = videos.map((video) => {
        if (video.id === id) {
          return { ...video, url: URL.createObjectURL(file) };
        }
        return video;
      });
      setVideos(newVideos);
    }
  };

  const handleClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="panel-container">
      <TopbarPanel />

      {/* Fotoğraflar Başlığı */}
      <div className="panel-section-title-box">📷 Fotoğraflar</div>
      <div className="media-grid">
        {photos.map((photo) => {
          const inputRef = useRef(null);
          return (
            <div key={photo.id} className="media-item" onClick={() => handleClick(inputRef)}>
              {photo.url ? (
                <img src={photo.url} alt={photo.name} className="media-preview" />
              ) : (
                <div className="upload-placeholder">Fotoğraf Yükle</div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={(e) => handlePhotoUpload(e, photo.id)}
                className="upload-input"
              />
              <div className="media-date">{photo.date}</div>
            </div>
          );
        })}
      </div>

      {/* Videolar Başlığı */}
      <div className="panel-section-title-box">🎥 Videolar</div>
      <div className="media-grid">
        {videos.map((video) => {
          const inputRef = useRef(null);
          return (
            <div key={video.id} className="media-item" onClick={() => handleClick(inputRef)}>
              {video.url ? (
                <video controls className="media-preview">
                  <source src={video.url} type="video/mp4" />
                  Tarayıcınız video etiketini desteklemiyor.
                </video>
              ) : (
                <div className="upload-placeholder">Video Yükle</div>
              )}
              <input
                type="file"
                accept="video/*"
                ref={inputRef}
                onChange={(e) => handleVideoUpload(e, video.id)}
                className="upload-input"
              />
              <div className="media-date">{video.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Panel;
