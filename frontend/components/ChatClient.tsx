"use client";

import React, { useEffect, useState, KeyboardEvent, useRef } from 'react';
import { useStream } from "@langchain/langgraph-sdk/react";
import type { Message } from "@langchain/langgraph-sdk";
import { ArrowRight, X, User, Calendar, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat-input";
import {
  ChatBubble,
  ChatBubbleMessage,
  ChatBubbleAvatar
} from "@/components/ui/chat-bubble";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ChatClientProps {
  apiUrl?: string;
  assistantId?: string;
}

interface UserFormData {
  name: string;
  age: string;
  city: string;
}

const ChatClient: React.FC<ChatClientProps> = ({
  apiUrl: propApiUrl,
  assistantId: propAssistantId
}) => {
  // Reference to the messages container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize state with props or defaults
  const [config, setConfig] = useState({
    apiUrl: propApiUrl || "http://localhost:2024",
    assistantId: propAssistantId || "agent"
  });
  
  // Form data state
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    age: "",
    city: ""
  });
  
  // Load config from localStorage on client-side
  useEffect(() => {
    const storedApiUrl = localStorage.getItem("langgraph_api_url");
    const storedAssistantId = localStorage.getItem("langgraph_assistant_id");
    
    // Only update if there are stored values (override props)
    if (storedApiUrl || storedAssistantId) {
      setConfig({
        apiUrl: storedApiUrl || config.apiUrl,
        assistantId: storedAssistantId || config.assistantId
      });
    }
  }, []);

  const thread = useStream<
    { messages: Message[] },
    { InterruptType: string }
  >({
    apiUrl: config.apiUrl,
    assistantId: config.assistantId,
    messagesKey: "messages",
  });

  const [input, setInput] = React.useState("");

  // Function to scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [thread.messages, thread.isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    thread.submit({ 
      messages: [{ 
        type: "human", 
        content: input 
      }] 
    });
    
    setInput("");
  };

  // Handle keyboard events for the chat input
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit the message when Enter is pressed and not with Shift (for multiline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid line break
      
      if (input.trim()) {
        thread.submit({ 
          messages: [{ 
            type: "human", 
            content: input 
          }] 
        });
        
        setInput("");
      }
    }
  };

  const handleResumeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    thread.submit(undefined, { 
      command: { 
        resume: {
          submitted: true,
          name: formData.name,
          age: formData.age,
          city: formData.city
        } 
      } 
    });
    
    // Reset form data
    setFormData({ name: "", age: "", city: "" });
  };
  
  const handleResumeCancel = () => {
    thread.submit(undefined, { 
      command: { 
        resume: {
          cancelled: true
        } 
      } 
    });
    
    // Reset form data
    setFormData({ name: "", age: "", city: "" });
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 min-h-full">
          {thread.messages.length === 0 && !thread.interrupt && (
            <div className="text-center text-gray-500 mt-4 mb-8">
              <p>No messages yet. Start a conversation!</p>
              <p className="text-xs mt-2">Connected to {config.apiUrl}</p>
            </div>
          )}
          
          <div className="space-y-6">
            {thread.messages.map((message) => (
              <ChatBubble 
                key={message.id || `${message.type}-${Date.now()}`}
                variant={message.type === 'human' ? "sent" : "received"}
              >
                {message.type !== 'human' && (
                  <ChatBubbleAvatar fallback="AI" className="bg-red-500" />
                )}
                <ChatBubbleMessage
                  variant={message.type === 'human' ? "sent" : "received"}
                  className={message.type === 'human' ? "bg-white text-black" : "bg-zinc-800 text-white"}
                >
                  {message.content as string}
                </ChatBubbleMessage>
                {message.type === 'human' && (
                  <ChatBubbleAvatar fallback="U" className="bg-blue-500" />
                )}
              </ChatBubble>
            ))}
            
            {thread.isLoading && !thread.interrupt && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" className="bg-red-500" />
                <ChatBubbleMessage
                  variant="received"
                  isLoading={true}
                  className="bg-zinc-800 text-white"
                />
              </ChatBubble>
            )}
          </div>
          
          {/* Invisible div at the bottom for scrolling reference */}
          <div ref={messagesEndRef} className="pt-4" />
        </div>
      </div>
      
      <div className="border-t border-zinc-800 p-4 bg-black">
        {thread.interrupt ? (
          <Card className="bg-zinc-900 border-zinc-700 text-white">
            <CardHeader>
              <CardTitle className="text-xl text-white">Additional Information Required</CardTitle>
              <CardDescription className="text-zinc-400">
                {thread.interrupt.value}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="user-info-form" onSubmit={handleResumeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                    <User size={16} />
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                    <Calendar size={16} />
                    Age
                  </label>
                  <Input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    placeholder="Enter your age"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                    <MapPin size={16} />
                    City
                  </label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    placeholder="Enter your city"
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t border-zinc-800 pt-4">
              <Button
                type="button"
                onClick={handleResumeCancel}
                variant="outline"
                className="bg-white text-black border-zinc-200 hover:bg-zinc-100 flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </Button>
              <Button
                type="submit"
                form="user-info-form"
                className="bg-zinc-900 text-white hover:bg-zinc-800 flex items-center gap-2"
              >
                <Check size={16} /> Submit
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={handleSubmit}
          >
            <ChatInput 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-zinc-900 text-white"
              disabled={thread.isLoading}
            />
            
            {thread.isLoading ? (
              <Button 
                type="button" 
                onClick={() => thread.stop()}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Stop
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-white text-black rounded-full hover:bg-white/90"
                disabled={input.trim() === ''}
              >
                <span>Send</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatClient; 