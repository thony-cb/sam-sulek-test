"use client";
import React, { useEffect, useRef, useState } from "react";
// import "normalize.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pane } from "tweakpane";
import CardCarousel from "@/components/CardCarousel";
import GsapHorizontalLoop from "@/components/GsapHorizontalLoop";

const Page: React.FC = () => {
  return (
    <div className="h-screen relative w-full">
      <GsapHorizontalLoop />
    </div>
  );
};

export default Page;
