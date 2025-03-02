"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConfigPage() {
  const router = useRouter();
  const [apiUrl, setApiUrl] = useState("http://localhost:2024");
  const [assistantId, setAssistantId] = useState("agent");

  // Load existing configuration on page load
  useEffect(() => {
    const storedApiUrl = localStorage.getItem("langgraph_api_url");
    const storedAssistantId = localStorage.getItem("langgraph_assistant_id");
    
    if (storedApiUrl) setApiUrl(storedApiUrl);
    if (storedAssistantId) setAssistantId(storedAssistantId);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Store settings in localStorage
    localStorage.setItem("langgraph_api_url", apiUrl);
    localStorage.setItem("langgraph_assistant_id", assistantId);
    
    // Redirect to home page
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-10 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Chat Configuration</h1>
          <Link href="/">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 text-zinc-300"
            >
              Back
            </Button>
          </Link>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              API URL
            </label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-700"
              placeholder="http://localhost:2024"
            />
            <p className="text-xs text-zinc-400">
              The URL of your LangGraph server
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Assistant ID
            </label>
            <input
              type="text"
              value={assistantId}
              onChange={(e) => setAssistantId(e.target.value)}
              className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-700"
              placeholder="agent"
            />
            <p className="text-xs text-zinc-400">
              The ID of your agent on the LangGraph server
            </p>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Configuration
          </Button>
        </form>
      </div>
    </main>
  );
} 