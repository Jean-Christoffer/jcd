"use client";

import { useState } from "react";
import { WorkItem } from "./types";

interface CardProps {
  workData: WorkItem;
}

interface DescriptionProps {
  description: string | null;
  categories: WorkItem["categories"];
}

export default function Card({ workData }: CardProps) {
  const { title, description, categories } = workData;

  const [showDescription, setShowDescription] = useState<boolean>(false);
  function handleClick() {
    setShowDescription((prev) => !prev);
  }
  return (
    <article>
      <button onClick={handleClick} className="hover:cursor-pointer">
        <h3 className="text-2xl md:text-4xl">{title}</h3>
      </button>
      {showDescription && (
        <Description description={description} categories={categories} />
      )}
    </article>
  );
}

const Description = ({ description, categories }: DescriptionProps) => {
  if (!description) return null;

  return (
    <div>
      <p>{description}</p>
      <p>
        Technologies used:
        <span className="flex items-center gap-4">
          {categories?.map((c, i) => (
            <span key={i + `${c.title}`}>{c.title}</span>
          ))}
        </span>
      </p>
    </div>
  );
};
