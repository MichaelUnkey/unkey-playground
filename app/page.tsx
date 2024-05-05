"use client";
import Terminal from "../components/terminal";
import { useState, useEffect } from "react";
import KeyPlayground from "@/components/keyPlayground";
import { TerminalContextProvider } from "react-terminal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { data } from "@/lib/data";
export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [stepData, setStepData] = useState(data);
  const [step, setStep] = useState<number>(1);
  const [key, setKey] = useState({
    keyId: "",
    key: "",
  });

  type key = {
    keyId: string;
    keyName: string;
  };

  useEffect(() => {
    if (
      searchParams.get("step") !== null &&
      searchParams.get("step") !== undefined
    ) {
      setStep(parseInt(searchParams.get("step") ?? "1"));
    }
    console.log("parent", stepData['step1'].curlInput);
   
  }, [stepData, pathname]);
  const handleTerminal = (terminal: string) => {
  };
  function handleInput() {
    const step1 = stepData['step1'];
    step1.curlInput = "Test";
    setStepData({...stepData, step1});
  }
  const setData = (input: string) => {
  };

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
              step={step}
              setInput={() => handleInput()}
              data={stepData}
            />
          </div>
          <div className="flex flex-col w-1/2 h-full p-6">
            {/* <Link href="/?step=5">CLick me</Link> */}
            <TerminalContextProvider>
              <Terminal
                data={stepData}
                sendKey={key}
                step={step}
                setData={(input: string) => setData(input)}
              />
            </TerminalContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
