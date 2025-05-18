import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";


const ScrollableCards = ({ data }) => {
  const [isZoomed, setIsZoomed] = useState(null);

  const handleImageClick = (id) => {
    setIsZoomed(isZoomed === id ? null : id);
  };

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      loop={true}
      autoplay={{ delay: 3000 }}
      modules={[Autoplay]}
    >
      {data.map((card) => (
        <SwiperSlide key={card.id}>
          <div className="card">
            {/* Resim Alanı */}
            <div 
              className={`image-container ${isZoomed === card.id ? "zoomed" : ""}`} 
              onClick={() => handleImageClick(card.id)}
            >
              <img src={card.image} alt={card.title} className="card-image" />
            </div>

            {/* Başlık */}
            <h3>{card.title}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ScrollableCards;