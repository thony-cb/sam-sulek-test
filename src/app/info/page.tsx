import { ModeToggle } from "@/components/ModeToggle";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import React from "react";

export default function page() {
  return (
    <section className="flex flex-row justify-between  pt-20 w-full min-h-screen">
      <div className="flex flex-col gap-3 text-md">
        <h1 className="font-bold">About</h1>
        <p>Sam Sulek is a Hosstile Athlete Use code: SAM</p>
        <p>Sam posts’ bodybuilding content on youtube</p>
      </div>
      <div className="flex flex-col gap-3 text-md">
        <h2 className="font-bold">Credits</h2>
        <p>
          All content owned by{" "}
          <a
            target="_blank"
            className="flex flex-row hover:underline items-center gap-2"
            href="https://www.youtube.com/@sam_sulek"
          >
            Sam Sulek
            <ArrowTopRightIcon />
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-3 text-md">
        <h3 className="font-bold">Website Info</h3>
        <p>
          Passion Project by{" "}
          <a
            target="_blank"
            className="flex flex-row hover:underline items-center gap-2"
            href="https://cabrera-site-2.vercel.app/"
          >
            Diego Cabrera <ArrowTopRightIcon />
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-3 text-md">
        <h3 className="font-bold">Theme</h3>
        <ModeToggle />
      </div>
    </section>
  );
}
