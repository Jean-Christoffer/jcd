import { WORK_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import Body from "./components/Body";
import { client } from "@/sanity/lib/client";
import { WORK_QUERYResult, PROJECT_QUERYResult } from "@/sanity/types";

export default async function Home() {
  const [workExperience, projects] = await Promise.all([
    client.fetch<WORK_QUERYResult>(WORK_QUERY, {}),
    client.fetch<PROJECT_QUERYResult>(PROJECT_QUERY, {}),
  ]);

  return (
    <div className=" relative">
      <div className="d h-dvh">
        <main className="relative flex flex-col">
          <Body experience={workExperience} projects={projects} />
        </main>
      </div>
    </div>
  );
}
