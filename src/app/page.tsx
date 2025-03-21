import { WORK_QUERY } from "@/sanity/lib/queries";
import Body from "./components/Body";
import { client } from "@/sanity/lib/client";
import { WORK_QUERYResult } from "@/sanity/types";

export default async function Home() {
  const workExperience = await client.fetch<WORK_QUERYResult>(WORK_QUERY, {});

  return (
    <div className=" relative">
      <div className="d h-dvh">
        <main className="relative flex flex-col">
          <Body data={workExperience} />
        </main>
      </div>
    </div>
  );
}
