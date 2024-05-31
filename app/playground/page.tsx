"use client";

import { SquareArrowOutUpRight, KeyRound } from "lucide-react";
import TerminalInput from "../../components/ui/terminalInput";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { type Message } from "@/lib/data";
import TextAnimator from "../../components/ui/textAnimator";
import { useCallback, useRef, useState } from "react";
import startData from "@/lib/data";
import { handleCurlServer } from "@/lib/helper";

export default function PlaygroundHome() {
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const [historyItems, updateHistoryItems] = useState(startData[0].messages);
  const step = useRef<number>(0);
  const timeStamp = useRef<number>(Date.now() + 24 * 60 * 60 * 1000);
  const keyId = useRef<string>();
  const keyName = useRef<string>();

  const parseCurlCommand = useCallback(
    (stepString: string) => {
      let tempString = stepString;
      tempString = tempString.replace(
        "<timeStamp>",
        timeStamp.current.toString()
      );
      if (apiId) {
        tempString =
          apiId.length > 0 ? tempString.replace("<apiId>", apiId) : tempString;
      }
      tempString = keyId.current
        ? tempString.replace("<keyId>", keyId.current)
        : tempString;
      tempString = keyName.current
        ? tempString.replace("<key>", keyName.current)
        : tempString;
      return tempString;
    },
    [apiId, keyId, keyName, timeStamp]
  );
  function handleSubmit(cmd: string) {
    postNewLine(cmd, "text-violet-500");
    handleCurl(cmd);
  }

  function postNewLine(input: string, color: string) {
    let temp = historyItems;
    temp.push({ content: input, color: color });
    updateHistoryItems([...temp]);
  }

  async function handleCurl(curlString: string) {
    postNewLine("Processing...", "text-green-500");
    if(!curlString.includes("curl")){
        postNewLine(`{"Error", "Invalid Curl Command"}`, "text-red-500");
        return;
    }
    // setTerminalInput({ content: "Processing...", color: "text-green-500" });
    const parsedCurlString = curlString.replace("--data", "--data-raw");
    const response = await handleCurlServer(parsedCurlString);
    if (response) {
      const resJson = JSON.parse(JSON.stringify(response, null, 2));
      if (resJson.error) {
        postNewLine(JSON.stringify(response, null, 2), "text-red-500");
        return;
      }
      const result = resJson.result;
      // Response from server to Terminal
      postNewLine(JSON.stringify(result, null, 2), "text-blue-500");

      if (result.keyId) {
        keyId.current = result.keyId;
      }
      if(result.key){
        keyName.current = result.key;
      }
      console.log("Result", result);

      const newCurl = parseCurlCommand(
        startData[step.current + 1].curlCommand ?? "");
      postNewLine(startData[step.current + 1].header, "text-white");
      const newMessages = startData[step.current + 1].messages;
      newMessages.map((item: Message) => {
        let cmd = parseCurlCommand(item.content);
        postNewLine(cmd, "text-white");
      });
      postNewLine(newCurl, "text-white");
      step.current += 1;
    }
  }

  const HistoryList = () => {
    
    return historyItems?.map((item, index) => {
      {
        if (index === historyItems.length - 1) {
          return (
            <pre
              key={index}
              className={cn(
                "flex flex-row text-lg font-medium leading-7",
                item.color,
                GeistMono.className
              )}
            >
              <TextAnimator
                input={item.content}
                repeat={0}
                style={cn(
                  "flex flex-row text-lg font-medium leading-7",
                  item.color,
                  GeistMono.className
                )}
              />
              <div className=" snap-end h-20">{" "}</div>
            </pre>
          );
        } else {
          return (
            <div
              key={index}
              className={cn("flex flex-row", GeistMono.className)}
            >
              <pre
                className={cn(
                  "flex flex-row text-lg font-medium leading-7",
                  item.color,
                  GeistMono.className
                )}
              >
                {item.content}
              </pre>
            </div>
          );
        }
      }
    });
  };
  return (
    <div className="flex flex-col w-full h-full justify-center">
      <div className="mx-auto w-full h-full justify-center max-w-[1440px]">
        <h1 className="section-title-heading-gradient max-sm:mx-6 max-sm:text-4xl font-medium text-[4rem] leading-[4rem] max-w-xl text-left mt-16 py-2">
          Unkey API Playground
        </h1>
        <div className=" min-w-full h-full mt-12">
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
          <div className="flex flex-col min-w-full h-[900px] bg-gray-900 overflow-hidden ">
            <div className="flex flex-col w-full rounded-lg pt-4 pl-6 scrollbar-hide overflow-y-scroll scroll-smooth snap-y">
              <HistoryList />
            </div>
           
          </div>
          <TerminalInput sendInput={(cmd) => handleSubmit(cmd)} />
        </div>
      </div>
    </div>
  );
}
