import Link from "next/link";
import ChatClient from "@/components/ChatClient";

export default function Home() {
  return (
    <main className="h-[100dvh] bg-black text-white overflow-hidden">
      <div className="h-full flex flex-col">
        <header className="flex justify-between items-center p-4 bg-black border-b border-zinc-800">
          <h1 className="text-2xl font-bold">AI Chat</h1>
          <Link 
            href="/config" 
            className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition"
          >
            Settings
          </Link>
        </header>
        <div className="flex-1 overflow-hidden">
          <ChatClient />
        </div>
      </div>
    </main>
  )
}

