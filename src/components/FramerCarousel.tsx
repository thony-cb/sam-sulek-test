"use client";
import {
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const keywords = [
  "night",
  "city",
  "sky",
  "sunset",
  "sunrise",
  "winter",
  "skyscraper",
  "building",
  "cityscape",
  "architecture",
  "street",
  "lights",
  "downtown",
  "bridge",
];

export default function FramerCarousel() {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  //   const cards = keywords.map(
  //     (keyword) => `https://source.unsplash.com/random/?${keyword}`
  //   );
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const handleDrag = (_: any, info: PanInfo) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  return (
    <>
      <div className="relative h-[500px] w-full overflow-hidden">
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12"
          style={{
            background:
              "linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgb(26, 25, 27) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(26, 25, 27) 100%)",
          }}
        />
        <div
          className="flex h-full items-center justify-center bg-mauve-dark-2"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transform: "rotateX(0deg)",
          }}
        >
          <motion.div
            drag="x"
            className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            {cards.map((imgUrl, i) => {
              return (
                <div
                  key={i}
                  className="absolute flex h-full origin-center items-center justify-center bg-mauve-dark-2 p-2"
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${
                      i * (360 / faceCount)
                    }deg) translateZ(${radius}px)`,
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt="img"
                    width={600}
                    height={450}
                    className="pointer-events-none h-12 w-full rounded-xl object-cover md:h-20"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}
const cards = [
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
