import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const ScrollableCards = ({ data }) => {
  const [zoomedImage, setZoomedImage] = useState(null);

  const openModal = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  const closeModal = () => {
    setZoomedImage(null);
  };

  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
      >
        {data.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="scroll-card" onClick={() => openModal(card.image)}>
              <div className="scroll-image-container">
                <img src={card.image} alt="" className="scroll-card-image" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      {zoomedImage && (
        <div className="image-modal" onClick={closeModal}>
          <img src={zoomedImage} alt="Zoomed" className="modal-image" />
        </div>
      )}
    </>
  );
};

export default ScrollableCards;
