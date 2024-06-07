"use client";
import React, { useEffect, useRef } from "react";
import { Pane } from "tweakpane";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, Observer);

interface Config {
  debug: boolean;
  backface: boolean;
  buff: number;
  animate: boolean;
  scroll: boolean;
  dark: boolean;
  masklower: number;
  maskupper: number;
  perspective: number;
  vertical: boolean;
  infinite: boolean;
  items: number;
  gap: number;
  rotatex: number;
  rotatez: number;
  speed: number;
}

const CONFIG: Config = {
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
  infinite: false,
  items: 16,
  gap: 0.1,
  rotatex: 0,
  rotatez: 0,
  speed: 1,
};

const GsapHorizontalLoop: React.FC = () => {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // const controlPanel = new Pane({ title: "Config", expanded: false });

    // controlPanel.addBinding(CONFIG, "animate", { label: "Animate" });
    // controlPanel.addBinding(CONFIG, "debug", { label: "Debug" });
    // controlPanel.addBinding(CONFIG, "backface", { label: "Backface" });
    // controlPanel.addBinding(CONFIG, "perspective", {
    //   label: "Perspective (px)",
    //   min: 50,
    //   max: 1500,
    //   step: 1,
    // });
    // controlPanel.addBinding(CONFIG, "gap", {
    //   label: "Gap (%)",
    //   min: 0,
    //   max: 5,
    //   step: 0.1,
    // });
    // controlPanel.addBinding(CONFIG, "items", {
    //   label: "Items",
    //   min: 10,
    //   max: 50,
    //   step: 1,
    // });
    // controlPanel.addBinding(CONFIG, "dark", { label: "Dark Theme" });
    // controlPanel.addBinding(CONFIG, "speed", {
    //   label: "Speed",
    //   min: 0.1,
    //   max: 5,
    //   step: 0.1,
    // });

    // const scrolling = controlPanel.addFolder({
    //   title: "Scrolling",
    //   expanded: false,
    // });
    // scrolling.addBinding(CONFIG, "scroll", { label: "Scroll Drive" });
    // scrolling.addBinding(CONFIG, "vertical", { label: "Vertical" });
    // scrolling.addBinding(CONFIG, "infinite", { label: "Infinite" });
    // scrolling.addBinding(CONFIG, "buff", {
    //   label: "Ratio",
    //   min: 1,
    //   max: 10,
    //   step: 0.1,
    // });

    // const rotation = controlPanel.addFolder({
    //   title: "Rotation",
    //   expanded: false,
    // });
    // rotation.addBinding(CONFIG, "rotatex", {
    //   min: 0,
    //   max: 360,
    //   step: 1,
    //   label: "X",
    // });
    // rotation.addBinding(CONFIG, "rotatez", {
    //   min: 0,
    //   max: 360,
    //   step: 1,
    //   label: "Z",
    // });

    // const masker = controlPanel.addFolder({ title: "Mask", expanded: false });
    // masker.addBinding(CONFIG, "masklower", {
    //   label: "Lower (Item W)",
    //   min: 0,
    //   max: 5,
    //   step: 0.1,
    // });
    // masker.addBinding(CONFIG, "maskupper", {
    //   label: "Upper (Item W)",
    //   min: 0,
    //   max: 5,
    //   step: 0.1,
    // });

    // controlPanel.on("change", sync);

    // Create the horizontal loop animation
    let loop = horizontalLoop(containerRef.current?.children, {
      repeat: -1,
    });
    let slow = gsap.to(loop, { timeScale: 0, duration: 0.5 });
    loop.timeScale(0);

    Observer.create({
      target: containerRef.current,
      type: "pointer,touch,wheel",
      wheelSpeed: -1,
      onChange: (self) => {
        loop.timeScale(
          Math.abs(self.deltaX) > Math.abs(self.deltaY)
            ? -self.deltaX
            : -self.deltaY
        );
        slow.invalidate().restart();
      },
    });

    function sync() {
      // Sync the CONFIG with the GSAP animation
      loop.vars.speed = CONFIG.speed;
      loop.invalidate();
    }
  }, []);

  return (
    <div className="gallery border flex items-center justify-center absolute w-full h-full overflow-hidden">
      <ul
        className="cards flex w-fit items snap-mandatory snap-x whitespace-nowrap  flex-row"
        ref={containerRef}
      >
        {Array.from({ length: 11 }, (_, i) => (
          <li
            className="list-none snap-center p-5 m-0 w-[14rem] text-black flex items-center justify-center basis-[14rem]  rounded-sm aspect-video text-center text-lg"
            key={i}
          >
            <Image
              src={"/assets/SamImg1.jpg"}
              alt="img"
              width={600}
              height={450}
              className="pointer-events-none h-12 w-full aspect-video  object-cover md:h-20"
            />
          </li>
        ))}
      </ul>
      <div className="active-img-indicator absolute  w-[14rem] aspect-video top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 border-white border-[0.05rem] rounded-sm h-[125px]  mix-blend-difference z-[2px]"></div>
    </div>
  );
};

export default GsapHorizontalLoop;

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items: HTMLCollection | undefined, config: any) {
  if (!items) return;

  const itemsArray = Array.from(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = itemsArray.length,
    startX = itemsArray[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap(config.snap || 1),
    // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth: number,
    curX: number,
    distanceToStart: number,
    distanceToLoop: number,
    item: HTMLElement,
    i: number;

  gsap.set(itemsArray, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(itemsArray, { x: 0 });
  totalWidth =
    itemsArray[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    itemsArray[length - 1].offsetWidth *
      gsap.getProperty(itemsArray[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = itemsArray[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars: any) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars: any) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}
