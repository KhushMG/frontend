import AnimeSearch from "@/components/AnimeSearch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="mt-[3rem]">
        <AnimeSearch className="mt-2 justify-center" />
      </div>
    </main>
  );
}
