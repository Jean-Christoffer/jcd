"use client";

import { useState } from "react";
import type { WorkItem } from "@/sanity/types";

interface CardProps {
  workData: WorkItem;
}

interface DescriptionProps {
  description: string | null;
}
export default function Card({ workData }: CardProps) {
  const { title, description, categories } = workData;

  const [showArticle, setShowArticle] = useState<boolean>(false);
  function handleClick() {
    setShowArticle((prev) => !prev);
  }
  return (
    <article>
      <button onClick={handleClick} className="hover:cursor-pointer">
        <h3 className="text-2xl md:text-4xl">{title}</h3>
      </button>
      {showArticle && <Description description={description} />}
      {categories?.map((c) => <p key={c._id}>{c.title}</p>)}
    </article>
  );
}

const Description = ({ description }: DescriptionProps) => {
  if (!description) return null;

  return <p>{description}</p>;
};
