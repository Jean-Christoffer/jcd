"use client";

import { useState } from "react";
import { WorkItem } from "./types";
import { Icon } from "@iconify/react";
import { iconMap } from "@/iconMap";

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
      <button
        onClick={handleClick}
        className="hover:cursor-pointer article-expandable mb-4"
      >
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
    <div className="max-w-[590px]">
      <p className="mb-4 description">{description}</p>
      <div>
        <span><strong>Technologies used:</strong></span>
        <span className="flex items-center gap-4 flex-wrap mt-4">
          {categories?.map((category) => {
            const slug = category.slug?.current;
            const iconName = iconMap[slug ?? ""];

            return (
              <div key={category._id}>
                {iconName ? (
                  <Icon icon={iconName} width={30} height={30} />
                ) : (
                  <span>{category.title}</span>
                )}
              </div>
            );
          })}
        </span>
      </div>
    </div>
  );
};
