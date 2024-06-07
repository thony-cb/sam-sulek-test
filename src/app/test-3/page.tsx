"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface ImageType {
  src: string;
  alt: string;
  title: string;
}
export default function Page() {
  useEffect(() => {
    const imagesContainer = document.querySelector(".images") as HTMLElement;
    const preview = document.querySelector(".preview") as HTMLElement;
    const minimap = document.querySelector(".minimap") as HTMLElement;

    function getElementTop(element: HTMLElement | null): number {
      let top = 0;
      while (element) {
        top += element.offsetTop;
        element = element.offsetParent as HTMLElement;
      }
      return top;
    }
    const imagesStart = getElementTop(imagesContainer);
    const imagesEnd = imagesStart + imagesContainer.offsetHeight;
    const viewportHeight = window.innerHeight;
    const previewHeight = preview.offsetHeight;
    const previewMaxTranslate = (minimap.offsetHeight - previewHeight) * 2.84;

    function handleScroll(): void {
      const scrollPosition = window.scrollY;
      const scrollRange = imagesEnd - imagesStart - viewportHeight;
      const previewScrollRange = Math.min(previewMaxTranslate, scrollRange);

      if (
        scrollRange >= imagesStart &&
        scrollPosition <= imagesEnd - viewportHeight
      ) {
        const scrollFraction = (scrollPosition - imagesStart) / scrollRange;
        const previewTranslateY = scrollFraction * previewScrollRange;
        preview.style.transform = `translateX(-50%) translateY(${previewTranslateY}px)`;
      } else if (scrollPosition < imagesStart) {
        preview.style.transform = `translateX(-50%) translateY(0px)`;
      } else {
        preview.style.transform = `translateX(-50%) translateY(${previewMaxTranslate}px)`;
      }
    }
    window.addEventListener("scroll", handleScroll);

    const togglePoint = window.innerHeight * 4;
    const wrapper = document.querySelector(".wrapper") as HTMLElement;

    function checkScroll(): void {
      if (window.scrollY >= togglePoint) {
        wrapper?.classList.add("light-theme");
      } else {
        wrapper?.classList.remove("light-theme");
      }
    }

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div className="gallery relative w-full flex z-0">
      <div className="minimap bg-red-400 sticky top-0 w-[25%] h-screen pt-[300px] overflow-hidden bg-black transition-[0.5]">
        <div className="preview absolute top-[40%] w-full h-fit flex flex-col items-center -translate-x-1/2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative w-full snap-y snap-center bg-yellow-50 h-[125px] left-[50%] p-5 overflow-hidden "
            //     currentImageIndex === index ? "" : ""
            //   }`}
              //   onClick={() => setCurrentImageIndex(index)} // Set the current image index on click
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={166}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="active-img-indicator absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 border-white border-[0.05rem] rounded-sm h-[125px] w-[100px] mix-blend-difference z-[2px]"></div>
      </div>
      <div className="images relative top-0 w-[75%]">
        {images.map((img, index) => (
          <div
            key={index}
            className="item relative w-fit overflow-hidden mx-[50px] my-auto"
          >
            <div className="item-img w-[70vw] aspect-video">
              <Image
                src={img.src}
                alt={img.alt}
                width={660}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="item-copy w-full flex justify-between px-1">
              <p className="text-xs text-white">{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
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
