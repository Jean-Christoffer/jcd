import { PROJECT_QUERYResult } from "@/sanity/types";
import Card from "./Card";

interface ProjectsProps {
  data: PROJECT_QUERYResult;
}
export default function Projects({ data }: ProjectsProps) {
  return (
    <article>
      <ul className="flex flex-col gap-4 list">
        <h1 className="text-4xl md:text-6xl font-bold mb-2">Projects</h1>
        {data.map((project) => (
          <li key={project.title}>
            <Card data={project} />
          </li>
        ))}
      </ul>
    </article>
  );
}
