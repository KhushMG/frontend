import AnimeSearch from "@/components/AnimeSearch";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="mt-[3rem]">
        <div className="flex justify-center">
          <button className="px-8 rounded-md bg-black text-white hover:bg-black/50 hover:text-white/50 transition ease-in-out duration-350"> 
          <Link href={"https://github.com/KhushMG/frontend"} target="_blank"> 
            Github Repo
          </Link>
            </button>
        </div>
        <AnimeSearch className="mt-2 justify-center" />
      </div>
    </main>
  );
}
