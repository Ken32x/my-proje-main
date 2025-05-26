import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const resimler = [
  { src: '/otell.webp', alt: 'Oteller' },
  { src: '/düğünnn.webp', alt: 'Düğünler' },
  { src: '/konserr.jpg', alt: 'Konserler' },
];

const HizmetKonumSlider = () => {
  return (
    <div className="hizmet-konum-slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={0}
        slidesPerView={1}
      >
        {resimler.map((resim, index) => (
          <SwiperSlide key={index}>
            <img src={resim.src} alt={resim.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HizmetKonumSlider;
