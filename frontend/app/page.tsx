"use client";

import { Thread } from "@assistant-ui/react";
import { PriceSnapshotTool } from "@/components/tools/price-snapshot/PriceSnapshotTool";
import { PurchaseStockTool } from "@/components/tools/purchase-stock/PurchaseStockTool";
import { CreateDeploymentTicketTool } from "@/components/tools/create-deployment-ticket/CreateDeploymentTicketTool";
import { ToolFallback } from "@/components/tools/ToolFallback";
import { makeMarkdownText } from "@assistant-ui/react-markdown";

const MarkdownText = makeMarkdownText({});

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Thread
        welcome={{
          suggestions: [
            {
              prompt: "How much revenue did Apple make last year?",
            },
            {
              prompt: "Is McDonald's profitable?",
            },
            {
              prompt: "What's the current stock price of Tesla?",
            },
            {
              prompt: "Create a deployment ticket for our application",
            },
          ],
        }}
        assistantMessage={{ components: { Text: MarkdownText, ToolFallback } }}
        tools={[PriceSnapshotTool, PurchaseStockTool, CreateDeploymentTicketTool]}
      />
    </div>
  );
}
