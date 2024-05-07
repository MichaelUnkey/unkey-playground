"use client";
import Terminal from "../components/terminal";
import { useState, useEffect } from "react";
import KeyPlayground from "@/components/keyPlayground";
import { TerminalContextProvider } from "react-terminal";
import { usePathname, useSearchParams } from "next/navigation";

import curl2Json from "@bany/curl-to-json";

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [stepsData, setStepsData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [terminalCurlInput, setTerminalCurlInput] = useState<string>("");
  const [inputTerminal, setInputTerminal] = useState<boolean>(false);
  const [step, setStep] = useState<string>(`step${1}`);
  const [key, setKey] = useState({
    keyId: "",
    key: "",
  });

  type key = {
    keyId: string;
    keyName: string;
  };
  
  
  // const data = ;
  // useMemo(() => {
  //   data.then((res) => {
  //     setStepsData(res);
  //   });
  // }, [data]);
  // useEffect(() => {
  //   if (
  //     searchParams.get("step") !== null &&
  //     searchParams.get("step") !== undefined
  //   ) {
  //     setStep(stepsData[`step${searchParams.get("step")}`]);
  //   }
  // }, [stepsData, pathname, inputTerminal]);
  // const handleTerminal = (terminal: string) => {};
  useEffect(() => {
    fetch('/api/getData')
      .then((res) => res.json())
      .then((data) => {
        setStepsData(data)
        setLoading(false)
      })
  }, [])
  function handleInput() {
    setInputTerminal(true);
    console.log("input terminal", inputTerminal);
  }
  function handleInputPlayground(input: boolean) {
    setInputTerminal(input);
    console.log("inputTerminal Var on page", inputTerminal);
    const command = stepsData[step].curlCommand;
    console.log("command",command);
    setTerminalCurlInput(command);
    console.log("input Page", inputTerminal);
  }
  function handleTerminalCurl(input: string) {
    setTerminalCurlInput(input);
    console.log("input terminal", inputTerminal);
    const json = curl2Json(input);
    console.log("json", json);
  }

  if (loading) return <p>Loading...</p>
  if (!stepsData) return <p>No Data Found</p>
  return (
    <div className="flex flex-col mx-auto w-full justify-center">
      <div className="flex flex-col mx-auto w-full justify-center max-w-[1440px]">
        <div className="mt-32">
          <h2 className="text-2xl">Unkey Playground</h2>
        </div>
        <div className="flex w-full mt-8 h-screen bg-gray-900 p-8 rounded-2xl ring-4 ring-purple-600">
          <div className="flex flex-col w-1/2 h-full overflow-hidden scroll-smooth">
            <KeyPlayground
              className=""
              inputTerminal={inputTerminal}
              terminalCurlInput={terminalCurlInput}
              inputFromPlayground={(input: boolean) =>
                handleInputPlayground(input)
              }
              stepsData={stepsData}
            />
          </div>
          <div className="flex flex-col w-1/2 h-full p-6">
            {/* <Link href="/?step=5">CLick me</Link> */}
            <TerminalContextProvider>
              <Terminal
                command={terminalCurlInput}
                data={stepsData}
                sendKey={key}
                step={step}
                setData={(input: string) => handleTerminalCurl(input)}
                isCommandSent={inputTerminal}
                inputFromTerminal={(isDone: boolean) =>
                  setInputTerminal(isDone)
                }
              />
            </TerminalContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
