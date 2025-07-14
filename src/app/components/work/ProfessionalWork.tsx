"use client";

import type { WORK_QUERYResult } from "@/sanity/types";

import Card from "./Card";

interface WorkProps {
  data: WORK_QUERYResult;
}

export default function Work({ data }: WorkProps) {
  return (
    <article className="flex flex-col gap-4 pb-4">
      <h2 className="text-4xl md:text-6xl font-bold mb-2">Experience</h2>
      <ul className="flex flex-col gap-4 list">
        {data.map((work) => (
          <li key={work.title}>
            <Card data={work} />
          </li>
        ))}
      </ul>
    </article>
  );
}
