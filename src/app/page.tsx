"use client";
import ImageSwiper from "@/components/ImageSwiper";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const imageIndex = Math.min(
      images.length - 1,
      Math.floor(scrollPosition / (window.innerHeight / images.length))
    );
    setCurrentImageIndex(imageIndex);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    console.log(`Scroll ${currentImageIndex}`);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const image = images[currentImageIndex];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="aspect-video overflow-hidden flex items-center max-w-[50vw] mx-auto border">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="object-cover"
        />
      </div>
      <p className="text-xs">{image.title}</p>
      <div className="flex flex-row gap-4 items-center mt-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`flex items-center justify-center p-2 ${
              currentImageIndex === index
                ? "border-white border-[0.05rem] rounded-sm"
                : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={88}
              height={44}
              className="object-cover"
            />
          </div>
        ))}
      </div>
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
    src: "/assets/SamImg2.jpg",
    width: 985,
    height: 491,
    alt: "Sam Image 2",
    title: "Spring Cut Day 65 - Side",
  },
  {
    src: "/assets/SamImg3.jpg",
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
