"use client";

import { useState } from "react";
import { CardItem } from "../types";
import { Icon } from "@iconify/react";
import { iconMap } from "../../lib/configs/iconMap";

import Link from "next/link";

interface CardProps {
  data: CardItem;
}

interface DescriptionProps {
  description: string | null;
  categories: CardItem["categories"];
}

export default function Card({ data }: CardProps) {
  const { title, description, categories } = data;

  const [showDescription, setShowDescription] = useState<boolean>(false);
  function handleClick() {
    setShowDescription((prev) => !prev);
  }
  return (
    <article>
      <button
        onClick={handleClick}
        className={`hover:cursor-pointer article-expandable mb-4 ${showDescription ? "clicked" : ""}`}
      >
        <h3 className="text-2xl md:text-4xl">{title}</h3>
      </button>
      {showDescription && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            {data.site && (
              <Link href={data.site} target="_blank" className="underline">
                <em>
                  <strong>Live site</strong>
                </em>
              </Link>
            )}
            {data.git && (
              <Link href={data.git} target="_blank" className="underline">
                <em>
                  <strong>GitHub</strong>
                </em>
              </Link>
            )}
          </div>

          <Description description={description} categories={categories} />
        </div>
      )}
    </article>
  );
}

const Description = ({ description, categories }: DescriptionProps) => {
  if (!description) return null;

  return (
    <div className="max-w-[590px] mb-4">
      <p className="mb-4 description">{description}</p>
      <div>
        <span>
          <strong>Technologies used:</strong>
        </span>
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
