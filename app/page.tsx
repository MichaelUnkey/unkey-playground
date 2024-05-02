"use client";
import Terminal from "../components/terminal";
import { useState, useEffect } from "react";
import KeyPlayground from "@/components/keyPlayground";
import { TerminalContextProvider } from "react-terminal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [key, setKey] = useState({
    keyId: "",
    key: "",
  });
  const data = [
    {
      step: 1,
      name: "Create Key",
      curlCommand: `curl --request POST \
    --url https://api.unkey.dev/v1/keys.createKey \
    --header 'Authorization: Bearer <token>' \
    --header 'Content-Type: application/json' \
    --data '{
    "apiId": ${apiId}
  }'`,
      curlInput: "",
      complete: false,
    },
    {
      step: 2,
      name: "Get Key",
      curlCommand: `curl --request GET \
    --url https://api.unkey.dev/v1/keys.getKey?keyId=key_12345 \
    --header 'Authorization: Bearer <token>'`,
      curlInput: "",
      complete: false,
    },
    {
      step: 3,
      name: "Verify Key",
      curlCommand: `curl --request POST \
    --url https://api.unkey.dev/v1/keys.verifyKey \
    --header 'Content-Type: application/json' \
    --data '{
    "apiId": "api_1234",
    "key": "sk_1234"
  }'`,
      curlInput: "",
      complete: false,
    },
    {
      step: 4,
      name: "OwnerId",
      curlCommand: `curl --request POST \
    --url https://api.unkey.dev/v1/keys.updateKey \
    --header 'Authorization: Bearer <token>' \
    --header 'Content-Type: application/json' \
    --data '{
    "keyId": "key_1234",
    "name": "Customer X",
    "ownerId": "user_123",
  }'`,
      curlInput: "",
      complete: false,
    },
    {
      step: 5,
      name: "Expiration",
      curlCommand: `curl --request POST \
    --url https://api.unkey.dev/v1/keys.updateKey \
    --header 'Authorization: Bearer <token>' \
    --header 'Content-Type: application/json' \
    --data '{
    "expires": <TimeStamp>,
  }'`,
      curlInput: "",
      complete: false,
    },
    {
      step: 6,
      name: "Verify Key",
      curlCommand: `curl --request POST \
    --url https://api.unkey.dev/v1/keys.verifyKey \
    --header 'Content-Type: application/json' \
    --data '{
    "apiId": "api_1234",
    "key": "sk_1234"
  }'`,
      curlInput: "",
      complete: false,
    },
    {
      step: 7,
      name: "Get Analytics",
      curlCommand: `curl --request GET \
    --url https://api.unkey.dev/v1/keys.getVerifications?keyId=<keyId> \
    --header 'Authorization: Bearer <token>'`,
      curlInput: "",
      complete: false,
    },
    {
      step: 8,
      name: "Disable Key",
      curlCommand: `curl --request POST \
    --url https://api.unkey.dev/v1/keys.updateKey \
    --header 'Authorization: Bearer <token>' \
    --header 'Content-Type: application/json' \
    --data '{
    "enabled": false,
  }'`,
      curlInput: "",
      complete: false,
    },
    {
      step: 9,
      name: "Verify Key",
      curlCommand: `curl --request POST \
    --url https://api.unkey.dev/v1/keys.verifyKey \
    --header 'Content-Type: application/json' \
    --data '{
    "apiId": "api_1234",
    "key": "sk_1234"
  }'`,
      curlInput: "",
      complete: false,
    },
    { step: 10, name: "Sign up", curlCommand: ``, curlInput: "", complete: false },
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
    console.log("parent", searchParams.get("step"));
    //console.log("parent", currentTerminal);
    //console.log("parent", data[step - 1].curlCommand);
    setCurrentTerminal(data[step - 1].curlCommand);
    console.log("parent", data[step - 1].curlInput);
    
    
  }, [currentTerminal, data, currentTerminal,pathname]);
  const handleTerminal = (terminal: string) => {
    //console.log(terminal);
  };
  function incrementStep() {
    setStep(step + 1);

    //get command from playground
    //pass command to terminal

    //get output from terminal
    //verify correct output
    //next step
  }
  const setData = (input: string) => {
    data[step - 1].curlInput = input;
    console.log("parent", data[step - 1].curlInput);
  };
  const handleSteps = (step: number) => {
    //console.log("parent", step);

    setCurrentTerminal(data[step - 1].curlCommand);
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
              setSteps={(step: number) => handleSteps(step)}
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
