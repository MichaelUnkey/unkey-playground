"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AutoTyper } from "@/components/autotyper";
import Terminal from "../components/terminal";
import { Button } from "@/components/ui/button";
import CodeComponent from "../components/codeComponent";
import { TerminalContextProvider } from "react-terminal";
import { cn } from "@/lib/utils";
import { useState } from "react";
import KeyPlayground from "@/components/keyPlayground";
export default function Home() {
  type key = {
    keyId: string;
    keyName: string;
  };

  const [newKey, setNewKey] = useState<key | null>(null);

  const handleStateChange = () => {
    setNewKey({
      keyId: "key_123",
      keyName: "my key",
    });
  };

  return (
    <div className="flex flex-col mx-auto w-full justify-center">
      <div className="flex flex-col mx-auto w-full justify-center max-w-[1440px]">
        <div className="mt-32">
          <h2 className="text-2xl">Unkey Playground</h2>
        </div>
        <div className="flex w-full mt-8 h-[1000px] bg-gray-900 p-8 rounded-2xl ring-4 ring-purple-600">
          <div className="flex flex-col w-1/2 h-full">
            <KeyPlayground />
          </div>
          <div className="flex flex-col w-1/2 h-full p-6">
            <Terminal />
          </div>
        </div>
      </div>
    </div>
  );
}
