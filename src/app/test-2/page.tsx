"use client";
import React, { useEffect, useRef, useState } from "react";
// import "normalize.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pane } from "tweakpane";
import CardCarousel from "@/components/CardCarousel";

const Page: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <CardCarousel />
    </div>
  );
};

export default Page;
