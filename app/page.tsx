"use client";
import Terminal from "../components/terminal";
import { useState, useEffect } from "react";
import KeyPlayground from "@/components/keyPlayground";
import { TerminalContextProvider } from "react-terminal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setUncaughtExceptionCaptureCallback } from "process";

export default function Home() {
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const now = Date.now();
  const currentTimestamp = Date.now()
  const [key, setKey] = useState({
    keyId: "",
    key: "",
  });
  const data = [
    {
      step: 1,
      name: "Create Key",
      curlCommand: `curl --request POST 
    --url https://api.unkey.dev/v1/keys.createKey 
    --header 'Authorization: Bearer <token>' 
    --header 'Content-Type: application/json' 
    --data '{
    "apiId": ${apiId}
  }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    {
      step: 2,
      name: "Get Key",
      curlCommand: `curl --request GET 
    --url https://api.unkey.dev/v1/keys.getKey?keyId=${key.keyId} 
    --header 'Authorization: Bearer <token>'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    {
      step: 3,
      name: "Verify Key",
      curlCommand: `curl --request POST 
    --url https://api.unkey.dev/v1/keys.verifyKey 
    --header 'Content-Type: application/json' 
    --data '{
    "apiId": ${apiId},
    "key": ${key.key}
  }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    {
      step: 4,
      name: "OwnerId",
      curlCommand: `curl --request POST 
    --url https://api.unkey.dev/v1/keys.updateKey 
    --header 'Authorization: Bearer <token>' 
    --header 'Content-Type: application/json' 
    --data '{
    "keyId": ${key.keyId},
    "name": "Customer X",
    "ownerId": "user_123",
  }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    {
      step: 5,
      name: "Expiration",
      curlCommand: `curl --request POST 
    --url https://api.unkey.dev/v1/keys.updateKey 
    --header 'Authorization: Bearer <token>' 
    --header 'Content-Type: application/json' 
    --data '{
    "keyId": ${key.keyId},
    "expires": ${currentTimestamp + 100000},
  }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    {
      step: 6,
      name: "Verify Key",
      curlCommand: `curl --request POST 
    --url https://api.unkey.dev/v1/keys.verifyKey 
    --header 'Content-Type: application/json' 
    --data '{
    "apiId": ${apiId},
    "key": ${key.key}
  }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    {
      step: 7,
      name: "Get Analytics",
      curlCommand: `curl --request GET 
    --url https://api.unkey.dev/v1/keys.getVerifications?keyId=${key.keyId} 
    --header 'Authorization: Bearer <token>'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    {
      step: 8,
      name: "Disable Key",
      curlCommand: `curl --request POST 
    --url https://api.unkey.dev/v1/keys.updateKey 
    --header 'Authorization: Bearer <token>' 
    --header 'Content-Type: application/json' 
    --data '{
    "keyId": ${key.keyId},
    "enabled": false,
  }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    {
      step: 9,
      name: "Verify Key",
      curlCommand: `curl --request POST 
    --url https://api.unkey.dev/v1/keys.verifyKey 
    --header 'Content-Type: application/json' 
    --data '{
      "apiId": ${apiId},
      "key": ${key.key}
  }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    { step: 10, name: "Sign up", curlCommand: ``, curlInput: "",curlResponse: "", complete: false },
  ];
  
  type key = {
    keyId: string;
    keyName: string;
  };

  const [step, setStep] = useState<number>(1);
  const [currentTerminal, setCurrentTerminal] = useState(() =>
    data[step - 1].step === 1 ? data[step - 1].curlCommand : ""
  );
  useEffect(() => {
    if(searchParams.get("step") !== null && searchParams.get("step") !== undefined){
      setStep(parseInt(searchParams.get("step") ?? "1"));
    }
    //console.log("parent", searchParams.get("step"));
    //console.log("parent", currentTerminal);
    //console.log("parent", data[step - 1].curlCommand);
    setCurrentTerminal(data[step - 1].curlCommand);
    //console.log("parent", data[step - 1].curlInput);
    
    
  }, [currentTerminal, data, currentTerminal,pathname]);
  const handleTerminal = (terminal: string) => {
    //console.log(terminal);
  };
  function handleInput(){
    data[step - 1].curlInput = data[step - 1].curlCommand;
    console.log("parent", data[step - 1].curlInput);
  }
  const setData = (input: string) => {
    data[step - 1].curlInput = input;
    console.log("parent", data[step - 1].curlInput);
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
              currentTerminal={currentTerminal}
              data={data}
            />
          </div>
          <div className="flex flex-col w-1/2 h-full p-6">
            {/* <Link href="/?step=5">CLick me</Link> */}
            <TerminalContextProvider>
              <Terminal current={currentTerminal.toString()} data={data} sendKey={key} step={step} setData={(input:string) => setData(input)} />
            </TerminalContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
