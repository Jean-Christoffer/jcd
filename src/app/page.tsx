"use client"
import Header from "./components/Header";
import Canvas from "./components/Canvas";

export default function Home() {
  function handleClick() {
   
  }
  return (
    <div className="overflow-hidden relative">
      <div className="d h-dvh overflow-hidden">
        <main className="no-scrollbar relative flex flex-col">
          <section className="overflow-x-hidden overflow-y-auto border-2 border-[#d9d9d9] p-5  m-5 md:p-10 md:m-10 relative h-[calc(100dvh-2.5rem)] md:h-[calc(100dvh-5rem)] ">
            <Header handleClick={handleClick} />
            <Canvas />
          </section>
        </main>
      </div>
    </div>
  );
}
