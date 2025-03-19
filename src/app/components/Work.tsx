"use client";

import Link from "next/link";

export default function Work() {
  const work = ["Nersten Gård", "Nersten Gård", "Nersten Gård", "Nersten Gård"];

  return (
    <article className="flex flex-col gap-7">
      <ul className="flex flex-col gap-7 list">
        <h1 className="text-4xl md:text-6xl font-bold list-item opacity-0">
          Projects
        </h1>
        {work.map((l, i) => (
          <li key={i} className="text-2xl opacity-0 list-item">
            {l}
          </li>
        ))}
        <p className="list-item  opacity-0 ">
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
