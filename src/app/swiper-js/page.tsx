"use client";
import React, { useState } from "react";
import {
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

export default function Page() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <main className="h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-gray-100">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        mousewheel={{ thresholdDelta: 3, sensitivity: 4 }}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[
          FreeMode,
          Navigation,
          Scrollbar,
          Pagination,
          Mousewheel,
          Thumbs,
        ]}
        className="mySwiper flex justify-center items-center max-w-[80vw] aspect-video"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className=" border-red-600 w-full p-20 max-w-[80vw] mx-auto aspect-video "
          >
            <div
              key={index}
              className={`w-full h-full ${
                thumbsSwiper === index
                  ? "border-white border-[0.05rem] rounded-sm"
                  : ""
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={360}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 scale-[50%] !overflow-visible w-full h-[20%]"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="bg-yellow-50  cursor-pointer w-[10vw] aspect-video "
          >
            <div
              key={index}
              className={`w-full h-full p-2 ${
                thumbsSwiper === index
                  ? "border-white border-[0.05rem] rounded-sm"
                  : ""
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={360}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
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
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 4",
    title: "Spring Cut Day 67 - Other Side",
  },
  {
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 4",
    title: "Spring Cut Day 0 - Other Side",
  },
  {
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 4",
    title: "Spring Cut Day 68 - Other Side",
  },
  {
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 4",
    title: "Spring Cut Day 67 - Other Side",
  },
  {
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 4",
    title: "Spring Cut Day 67 - Other Side",
  },
  {
    src: "/assets/SamImg1.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 4",
    title: "Spring Cut Day 67 - Other Side",
  },
];
