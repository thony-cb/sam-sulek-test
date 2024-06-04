import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function ImageSwiper() {
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        mousewheel={{ forceToAxis: true }}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper "
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="flex w-full h-full justify-center items-center bg-gray-500"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="aspect-video overflow-hidden flex items-center max-w-[50vw] mx-auto border"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
const images = [
  {
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 1",
    title: "Spring Cut Day 64 - Back",
  },
  {
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 2",
    title: "Spring Cut Day 65 - Side",
  },
  {
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 3",
    title: "Spring Cut Day 66 - Front",
  },
  {
    src: "/assets/SamImg4.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 4",
    title: "Spring Cut Day 67 - Other Side",
  },
];
