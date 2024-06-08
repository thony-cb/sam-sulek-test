"use client";
import React, { useEffect, useRef, useState } from "react";
// import "normalize.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pane } from "tweakpane";
import Image from "next/image";
import CardCarousel from "@/components/CardCarousel";

gsap.registerPlugin(ScrollTrigger);
const Home: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <CardCarousel />
    </div>
  );
};
export default Home;
