import React from "react";

const steps = [
  {
    id: 1,
    title: "QR Kodu Okut",
    image: "/QR.png",
  },
  {
    id: 2,
    title: "Fotoğraf & Video Yükle",
    image: "/Yükle.png",
  },
  {
    id: 3,
    title: "Tüm Galeri Bir Arada",
    image: "/Galeri.webp",
  },
];

const InfoSection = () => {
  return (
    <section className="info-section">
      <h2 className="info-title">Nasıl Kullanılır ?</h2>
      <div className="info-cards">
        {steps.map((step) => (
          <div key={step.id} className="info-card">
            <div className="image-container">
              <img src={step.image} alt={step.title} className="info-image" />
            </div>
            <h3>{step.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
