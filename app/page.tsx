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
import { useEffect, useState } from "react";
import KeyPlayground from "@/components/keyPlayground";
import Link from "next/link";

const terminalSteps = [
  {
    step: 1,
    curlCommand: `curl --request POST \
  --url https://api.unkey.dev/v1/keys.createKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234"
}'`,
  },
  {
    step: 2,
    curlCommand: `curl --request GET \
  --url https://api.unkey.dev/v1/keys.getKey?keyId=key_12345 \
  --header 'Authorization: Bearer <token>'`,
  },
  {
    step: 3,
    curlCommand: `curl --request POST \
  --url https://api.unkey.dev/v1/keys.verifyKey \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234",
  "key": "sk_1234"
}'`,
  },
  {
    step: 4,
    curlCommand: `curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "keyId": "key_1234",
  "name": "Customer X",
  "ownerId": "user_123",
}'`,
  },
  {
    step: 5,
    curlCommand: `curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "expires": <TimeStamp>,
}'`,
  },
  {
    step: 6,
    curlCommand: `curl --request POST \
  --url https://api.unkey.dev/v1/keys.verifyKey \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234",
  "key": "sk_1234"
}'`,
  },
  {
    step: 7,
    curlCommand: `curl --request GET \
  --url https://api.unkey.dev/v1/keys.getVerifications?keyId=<keyId> \
  --header 'Authorization: Bearer <token>'`,
  },
  {
    step: 8,
    curlCommand: `curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "enabled": false,
}'`,
  },
  {
    step: 9,
    curlCommand: `curl --request POST \
  --url https://api.unkey.dev/v1/keys.verifyKey \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234",
  "key": "sk_1234"
}'`,
  },
];

export default function Home() {
  type key = {
    keyId: string;
    keyName: string;
  };
  const [step, setStep] = useState<number>(1);
  const [currentTerminal, setCurrentTerminal] = useState<string>(terminalSteps[0].curlCommand);
  useEffect(() => {
    console.log(currentTerminal);
    
  }, [currentTerminal]);
  const handleTerminal = (terminal: string) => {
    console.log(terminal);
  };
  function incrementStep() {
    setStep(step + 1);


    //get command from playground
    //pass command to terminal

    //get output from terminal
    //verify correct output
    //next step
  }

  return (
    <div className="flex flex-col mx-auto w-full justify-center">
      <div className="flex flex-col mx-auto w-full justify-center max-w-[1440px]">
        <div className="mt-32">
          <h2 className="text-2xl">Unkey Playground</h2>
        </div>
        <div className="flex w-full mt-8 h-[1000px] bg-gray-900 p-8 rounded-2xl ring-4 ring-purple-600">
          <div className="flex flex-col w-1/2 h-full">
            <KeyPlayground className="" step={step} setCurrentTerminal={() => setCurrentTerminal} currentTerminal={currentTerminal} terminalSteps={terminalSteps}/>
          </div>
          <div className="flex flex-col w-1/2 h-full p-6">
            <Link href="/?step=5">CLick me</Link>
            <Terminal />
          </div>
        </div>
      </div>
    </div>
  );
}
