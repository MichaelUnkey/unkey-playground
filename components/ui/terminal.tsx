
import  {type Step, type Message } from "@/lib/data";
import startData from "@/lib/data";
interface TerminalProps extends React.ComponentPropsWithoutRef<"div"> {
  sendRequest: (curl: string) => void;
  response: string;
  stepNumber: number;
  stepData: Step;
  classNames?: {
    header?: string;
    input?: string;
    frame?: string;
  };
}

import { SquareArrowOutUpRight, KeyRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import TextAnimator from "./textAnimator";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import TerminalInput from "./terminalInput";



const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;

export default function Terminal({
  sendRequest,
  response,
  stepNumber,
  stepData,
  className,
  classNames,
}: TerminalProps) {
  

  const [currentStep, setCurrentStep] = useState(1);
  const historyItems: Message[] = [];
  const [allStepData, setAllStepData] = useState<Step[]>(startData);
  const [currStepData, setCurrStepData] = useState(stepData);
  const [curlResponse, setCurlResponse] = useState<string>(response);
  function logger(msg:string){
    console.log(`Logger: ${msg}`);
    console.log("HistoryItems", historyItems);
    console.log("CurrentStep", currentStep);
    console.log("AllStepData", allStepData);
    console.log("CurrStepData", currStepData);
  }
  useEffect(() => {
    setCurrentStep(stepNumber);
  }, [stepNumber]);

  useEffect(() => {

      setCurrStepData(stepData);
      stepData.messages.map((item: Message) => {
        historyItems.push(
          {
            content: item.content,
            color: "text-white-600",
          });
      }
     
    );
    logger("useEffect");
  }, [stepData]);

  useEffect(() => {
    if (curlResponse) {
      console.log("curlResponse", curlResponse);
      historyItems.push(
        {
          content: response,
          color: "text-green-600",
        });
    }
  }, [curlResponse]);

  useEffect(() => {
    setCurlResponse(response);
  }, [response]);

  const HistoryList = () => {
    return historyItems?.map((item, index) => {
      {
        if (index === historyItems.length - 1) {
          return (
            <div
              key={index}
              className={cn("flex flex-row", GeistMono.className)}
            >
              <TextAnimator
                input={item.content}
                repeat={0}
                style={`flex flex-row font-medium leading-7 text-white`}
              />
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className={cn("flex flex-row  ", GeistMono.className)}
            >
              <p
                className={cn(
                  "flex flex-row font-light leading-7",
                  item.color
                )}
              >
                {item.content}
              </p>
            </div>
          );
        }
      }
    });
  };

  // async function postNewLine(input: string) {
  //   updateHistoryItems([
  //     ...historyItems ?? [],
  //     {
  //       message: input,
  //       color: "text-white-600",
  //     },
  //   ]);
  //   return true;
  // }

  async function handleSubmit(cmd: string) {
    // postNewLine(cmd);
    sendRequest(cmd);
  }

  return (
    <div className=" min-w-full h-screen">
      <div className="flex flex-row w-full h-8 bg-gray-900 rounded-t-lg drop-shadow-[0_2px_1px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col w-1/3">
          <KeyRound size={18} className="mx-2 mt-1" />
        </div>
        <div className="flex flex-col w-1/3 justify-center">
          <p className="text-center">Heading</p>
        </div>
        <div className="flex flex-row w-1/3 justify-end my-auto">
          Step <SquareArrowOutUpRight size={18} className="pt-1 mx-2" />
        </div>
      </div>
      <div className="flex flex-col min-w-full h-full bg-gray-900 rounded-b-lg">
        <div className="flex flex-col w-full rounded-lg overflow-y-auto pt-4 pl-6">
          <HistoryList />
        </div>
        <TerminalInput sendInput={(cmd) => handleSubmit(cmd)} />
      </div>
    </div>
  );
}
