"use client";

import React, { useEffect, useRef, useState } from "react";
// import "normalize.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pane } from "tweakpane";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
const Page: React.FC = () => {
  const [config, setConfig] = useState({
    debug: false,
    backface: false,
    buff: 2,
    animate: true,
    scroll: true,
    dark: true,
    masklower: 0.9,
    maskupper: 1.8,
    perspective: 320,
    vertical: false,
    infinite: true,
    items: 16,
    gap: 0.1,
    rotatex: 0,
    rotatez: 0,
  });

  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!config.infinite) return;
      const scroller = scrollerRef.current!;
      if (config.vertical) {
        console.log("Hello");
        if (
          scroller.scrollTop + window.innerHeight >
          scroller.scrollHeight - 2
        ) {
          scroller.scrollTop = 2;
        }
        if (scroller.scrollTop < 2) {
          scroller.scrollTop = scroller.scrollHeight - 2;
        }
      } else {
        if (
          scroller.scrollLeft + window.innerWidth >
          scroller.scrollWidth - 2
        ) {
          scroller.scrollLeft = 2;
        }
        if (scroller.scrollLeft < 2) {
          scroller.scrollLeft = scroller.scrollWidth - 2;
        }
      }
    };

    const update = () => {
      document.documentElement.dataset.debug = String(config.debug);
      document.documentElement.dataset.animate = String(config.animate);
      document.documentElement.dataset.backface = String(config.backface);
      document.documentElement.dataset.scroll = String(config.scroll);
      document.documentElement.dataset.dark = String(config.dark);
      document.documentElement.dataset.vertical = String(config.vertical);
      document.documentElement.dataset.infinite = String(config.infinite);
      document.documentElement.style.setProperty(
        "--gap-efficient",
        String(config.gap)
      );
      document.documentElement.style.setProperty(
        "--rotate-x",
        String(config.rotatex)
      );
      document.documentElement.style.setProperty(
        "--rotate-z",
        String(config.rotatez)
      );
      document.documentElement.style.setProperty(
        "--mask-lower",
        String(config.masklower)
      );
      document.documentElement.style.setProperty(
        "--mask-upper",
        String(config.maskupper)
      );
      document.documentElement.style.setProperty(
        "--scroll-ratio",
        String(config.buff)
      );
      document.documentElement.style.setProperty(
        "--perspective",
        String(config.perspective)
      );

      if (
        !CSS.supports("animation-timeline: scroll()") &&
        config.scroll &&
        config.animate
      ) {
        if (scrollerRef.current) {
          scrollerRef.current[config.vertical ? "scrollTop" : "scrollLeft"] = 0;
        }
        document.documentElement.dataset.gsap = "true";
        gsap.set([".carousel"], { animation: "none", "--rotate": 0 });
        gsap.to(".carousel", {
          rotateY: -360,
          "--rotate": 360,
          ease: "none",
          scrollTrigger: {
            horizontal: !config.vertical,
            scroller: ".controller",
            scrub: true,
          },
        });
      } else {
        document.documentElement.dataset.gsap = "false";
        gsap.set(".carousel", { clearProps: true });
        ScrollTrigger.killAll();
        const carousel = document.querySelector(".carousel");
        if (carousel) {
          carousel.removeAttribute("style");
        }
      }
    };

    const controlPanel = new Pane({ title: "Config", expanded: false });
    controlPanel.addBinding(config, "animate", { label: "Animate" });
    const scrolling = controlPanel.addFolder({
      title: "Scrolling",
      expanded: false,
    });
    scrolling.addBinding(config, "scroll", { label: "Scroll Drive" });
    scrolling.addBinding(config, "vertical", { label: "Vertical" });
    scrolling.addBinding(config, "infinite", { label: "Infinite" });
    scrolling.addBinding(config, "buff", {
      label: "Ratio",
      min: 1,
      max: 10,
      step: 0.1,
    });
    scrolling.addBinding(config, "debug", { label: "Debug" });
    const rotation = controlPanel.addFolder({
      title: "Rotation",
      expanded: false,
    });
    rotation.addBinding(config, "rotatex", {
      min: 0,
      max: 360,
      step: 1,
      label: "X",
    });
    rotation.addBinding(config, "rotatez", {
      min: 0,
      max: 360,
      step: 1,
      label: "Z",
    });
    const masker = controlPanel.addFolder({ title: "Mask", expanded: false });
    masker.addBinding(config, "masklower", {
      label: "Lower (Item W)",
      min: 0,
      max: 5,
      step: 0.1,
    });
    masker.addBinding(config, "maskupper", {
      label: "Upper (Item W)",
      min: 0,
      max: 5,
      step: 0.1,
    });
    controlPanel.addBinding(config, "backface", { label: "Backface" });
    controlPanel.addBinding(config, "perspective", {
      label: "Perspective (px)",
      min: 50,
      max: 5500,
      step: 1,
    });
    controlPanel.addBinding(config, "gap", {
      label: "Gap (%)",
      min: 0,
      max: 5,
      step: 0.1,
    });
    controlPanel.addBinding(config, "items", {
      label: "Items",
      min: 10,
      max: 50,
      step: 1,
    });
    controlPanel.addBinding(config, "dark", { label: "Dark Theme" });

    update();

    if (scrollerRef.current) {
      scrollerRef.current.addEventListener("scroll", handleScroll);
    }

    controlPanel.on("change", () => {
      update();
    });

    return () => {
      controlPanel.dispose();
      if (scrollerRef.current) {
        scrollerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [config]);
  return (
    <div
      className={`h-screen w-screen ${
        config.dark ? "bg-gray-900" : "bg-white"
      } text-${config.dark ? "white" : "black"}`}
    >
      <main className="grid place-items-center h-full w-full relative transition-transform duration-200">
        <div
          className="container"
          style={{ "--total": config.items } as React.CSSProperties}
        >
          <div className="carousel-container">
            <ul className="carousel">
              {Array.from({ length: config.items }, (_, i) => (
                <li key={i} style={{ "--index": i } as React.CSSProperties}>
                  <Image
                    src={images[i % images.length].src}
                    alt={images[i % images.length].alt}
                    width={images[i % images.length].width}
                    height={images[i % images.length].height}
                    title={images[i % images.length].title}
                  />
                </li>
              ))}
            </ul>
          </div>
          <ul className="controller" ref={scrollerRef}>
            {Array.from({ length: config.items }, (_, i) => (
              <li key={`controller-${i}`}></li>
            ))}
          </ul>
        </div>
      </main>
      <h1 className="fixed bottom-4 right-4 opacity-0 transition-opacity duration-200">
        Scroll.
      </h1>
    </div>
  );
};
export default Page;
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
];
