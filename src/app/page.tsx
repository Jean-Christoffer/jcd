import { WORK_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";

import Content from "./components/Content";

import { client } from "@/sanity/lib/client";
import { WORK_QUERYResult, PROJECT_QUERYResult } from "@/sanity/types";

export default async function Home() {
  const [workExperience, projects] = await Promise.all([
    client.fetch<WORK_QUERYResult>(WORK_QUERY, {}),
    client.fetch<PROJECT_QUERYResult>(PROJECT_QUERY, {}),
  ]);

  return (
    <div className=" relative">
      <main className="relative flex flex-col">
        <Content experience={workExperience} projects={projects} />
      </main>
    </div>
  );
}
