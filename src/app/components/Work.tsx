"use client";

import type { WORK_QUERYResult } from "@/sanity/types";

import Link from "next/link";
import Card from "./Card";

interface WorkProps {
  data: WORK_QUERYResult;
}

export default function Work({ data }: WorkProps) {
  return (
    <article className="flex flex-col gap-7 pb-4">
      <ul className="flex flex-col gap-4 list">
        <h1 className="text-4xl md:text-6xl font-bold mb-2">Experience</h1>
        {data.map((work) => (
          <li key={work.title}>
            <Card data={work} />
          </li>
        ))}
        <p>
          Contact me on{" "}
          <Link
            href="https://www.linkedin.com/in/jean-christoffer-d-7b7552260/"
            target="_blank"
            className="underline font-bold italic"
          >
            Linkedin
          </Link>
        </p>
      </ul>
    </article>
  );
}
