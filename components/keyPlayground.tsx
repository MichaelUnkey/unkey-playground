"use client";

import { CodeBlock } from "./ui/codeBlock";
import TerminalProvider from "./terminalProvider";
import Terminal from "./terminal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { handleCurlServer } from "../lib/helper";
import {type stepDataType, data } from "@/lib/data";

export default function KeyPlayground() {

  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const [stepData, setStepData] = useState<stepDataType>(data);
  // Curl Commands
  const [curlResponse, setCurlResponse] = useState<string>("");
  const [curlString, setCurlString] = useState<string>("");
  const [renderString, setRenderString] = useState<string>("");
  // Step Data
  const [step, setStep] = useState<number>(1);
  // Shared Data
  const [timeStamp, setTimStamp]= useState<number>(Date.now() + 24 * 60 * 60 * 1000);
  const [keyId, setKeyId] = useState<string>("");
  const [keyName, setKeyName] = useState<string>("");
  // Router
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.get("step")
      ? setStep(parseInt(params.get("step") as string))
      : setStep(1);
  }, [pathname, searchParams]);

  function handleSteps(step: number) {
    router.push(pathname + "?" + createQueryString("step", step.toString()));
  }

  useEffect(() => {
    handleRender(step);
  }, [handleRender, step]);

  function parseCurlCommand(stepString: string) {
    let tempString = stepString;

    tempString = tempString.replace("<timeStamp>", timeStamp.toString());
    if (apiId) {
      tempString =
        apiId.length > 0 ? tempString.replace("<apiId>", apiId) : tempString;
    }
    tempString =
      keyId.length > 0 ? tempString.replace("<keyId>", keyId) : tempString;
    tempString =
      keyName.length > 0 ? tempString.replace("<key>", keyName) : tempString;
    return tempString;
  }

  async function handleButtonClick(index: number) {
    let tempString = stepData[index]?.curlCommand ?? "";
    const curlString = parseCurlCommand(tempString);
    handleCurl(curlString);
  }

  async function handleCurl(curlString: string) {
    setCurlString(curlString);
    curlString = curlString.replace("--data", "--data-raw");
    const response = await handleCurlServer(curlString);
    if (response) {
      const resJson = JSON.parse(JSON.stringify(response));
      if (resJson.error) {
        setCurlResponse(JSON.stringify(response.error));
        return;
      }
      const result = resJson.result;
      if (step === 1) {
        setKeyId(result.keyId);
        setKeyName(result.key);
        stepData[2].curlCommand = parseCurlCommand(stepData[2].curlCommand ?? "");
      }

      handleRender(step + 1);
      handleSteps(step + 1);
      setCurlResponse(JSON.stringify(result));
    }
  }
  async function handleTerminalRequest(curlString: string) {
    handleCurl(curlString);
  }
  async function handleRender(index: number) {
    if (stepData) {
      let tempString = stepData[index].curlCommand ?? "";
      const curlString = parseCurlCommand(tempString);
      setRenderString(curlString);
    }
  }
  return !stepData ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-row w-full text-white">
      <div className="flex flex-col w-1/2 h-full scroll-smooth overflow-hidden">
        <Accordion type="single" collapsible value={`step${step.toString()}`}>
          <AccordionItem value="step1">
            <p className="text-center text-lg">
              Welcome to the Unkey playground.
            </p>
            <p className="text-center text-lg mt-2">
              Here you can test out the Unkey API without signing up to get an
              idea of how it works.{" "}
            </p>
            <p>
              Directions: Type commands in manualy, copy and paste, or just
              click the &quot;Send request&quot; button under each step.
            </p>
            <AccordionTrigger onFocus={() => handleSteps(1)} className="mt-6">
              1. Create Key
            </AccordionTrigger>
            <AccordionContent className="AccordionContent">
              <div className="flex flex-col gap-4 ">
                <p>{stepData[1].blurb}</p>
                <p>
                  API ID: <span className="my-2 text-violet-400">{apiId}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[1].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[1]?.headers?.authorization}
                  </span>
                </p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[1]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[1].method}
                  </span>
                </p>
                <p>
                  Leave the{" "}
                  <span className="my-2 text-violet-400">&lt;token&gt;</span>{" "}
                  tag for now. Normally you would put your root key here. We
                  will handle any rootkey requirements in this playground.
                </p>
                <CodeBlock className="">{stepData[1].curlCommand}</CodeBlock>
                <div className="flex justify-end">
                  <Button
                    className="lg:w-1/4"
                    onClick={() => handleButtonClick(1)}
                    variant={"outline"}
                  >
                    Send request
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step2">
            <AccordionTrigger onFocus={() => handleSteps(2)}>
              2. Get Key
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[2].blurb}</p>
                <p>
                  keyId: <span className="my-2 text-violet-400">{keyId}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[2].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[2]?.headers?.authorization}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[2].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
                <div className="flex justify-end">
                  <Button
                    className="lg:w-1/4"
                    onClick={() => handleButtonClick(2)}
                    variant={"outline"}
                  >
                    Send request
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step3">
            <AccordionTrigger onFocus={() => handleSteps(3)}>
              3. Verify Key
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[3].blurb}</p>
                <p>
                  API ID: <span className="my-2 text-violet-400">{apiId}</span>
                </p>
                <p>
                  keyId: <span className="my-2 text-violet-400">{keyId}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[3].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[3]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[3].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
              </div>
              <Button onClick={() => handleButtonClick(3)} variant={"outline"}>
                Send request
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step4">
            <AccordionTrigger onFocus={() => handleSteps(4)}>
              4. Update Key
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[4].blurb}</p>
                <p>
                  ownerId:{" "}
                  <span className="my-2 text-violet-400">user_1234</span>
                </p>
                <p>
                  keyId: <span className="my-2 text-violet-400">{keyId}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[4].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[4]?.headers?.authorization}
                  </span>
                </p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[4]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[4].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
              </div>
              <Button onClick={() => handleButtonClick(4)} variant={"outline"}>
                Send request
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step5">
            <AccordionTrigger onFocus={() => handleSteps(5)}>
              5. Verify Key
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[5].blurb}</p>
                <p>
                  API ID: <span className="my-2 text-violet-400">{apiId}</span>
                </p>
                <p>
                  Key name:{" "}
                  <span className="my-2 text-violet-400">{keyName}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[5].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[5]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[5].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
              </div>
              <Button onClick={() => handleButtonClick(5)} variant={"outline"}>
                Send request
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step6">
            <AccordionTrigger onFocus={() => handleSteps(6)}>
              6. Update expiration
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[6].blurb}</p>
                <p>
                  Expiration:{" "}
                  <span className="my-2 text-violet-400">{timeStamp}</span>
                </p>
                <p>
                  keyId: <span className="my-2 text-violet-400">{keyId}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[6].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[6]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[6].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
              </div>

              <Button onClick={() => handleButtonClick(6)} variant={"outline"}>
                Send request
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step7">
            <AccordionTrigger onFocus={() => handleSteps(7)}>
              7. Verify Key
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[7].blurb}</p>
                <p>
                  API ID: <span className="my-2 text-violet-400">{apiId}</span>
                </p>
                <p>
                  Key Name:{" "}
                  <span className="my-2 text-violet-400">{keyName}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[7].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[7]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[7].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
              </div>

              <Button onClick={() => handleButtonClick(7)} variant={"outline"}>
                Send request
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step8">
            <AccordionTrigger onFocus={() => handleSteps(8)}>
              8. Verify Key
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[8].blurb}</p>
                <p>
                  keyId: <span className="my-2 text-violet-400">{keyId}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[8].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[8]?.headers?.authorization}
                  </span>
                </p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[8]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[8].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
              </div>

              <Button onClick={() => handleButtonClick(8)} variant={"outline"}>
                Send request
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step9">
            <AccordionTrigger onFocus={() => handleSteps(9)}>
              9. Delete Key
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[9].blurb}</p>
                <p>
                  keyId: <span className="my-2 text-violet-400">{keyId}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[9].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[9]?.headers?.authorization}
                  </span>
                </p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[9]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[9].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
              </div>
              <Button onClick={() => handleButtonClick(9)} variant={"outline"}>
                Send request
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step10">
            <AccordionTrigger onFocus={() => handleSteps(10)}>
              10. Verify Key
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <p>{stepData[10].blurb}</p>
                <p>
                  apiId: <span className="my-2 text-violet-400">{apiId}</span>
                </p>
                <p>
                  key: <span className="my-2 text-violet-400">{keyName}</span>
                </p>
                <p>
                  url:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[10].url}
                  </span>
                </p>
                <p>headers:</p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[10]?.headers?.contentType}
                  </span>
                </p>
                <p className="pl-4">
                  <span className="my-2 text-violet-400">
                    {stepData[10]?.headers?.contentType}
                  </span>
                </p>
                <p>
                  method:{" "}
                  <span className="my-2 text-violet-400">
                    {stepData[10].method}
                  </span>
                </p>
                <CodeBlock className="">{renderString}</CodeBlock>
              </div>
              <div className="flex flex-row justify-end">
                <Button
                  onClick={() => handleButtonClick(10)}
                  variant={"outline"}
                >
                  Send request
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step11">
            <AccordionTrigger onFocus={() => handleSteps(11)}>
              Sign Up
            </AccordionTrigger>
            <AccordionContent>
              <p>
                {stepData[11]?.blurb ?? "Sign up for an account to get started."}
              </p>
              Learn more: <br />
              <div className="flex flex-row justify-end">
                <a
                  href="https://www.unkey.com/docs/introduction"
                  target="_blank"
                  className="text-violet-400"
                >
                  <Button variant={"secondary"}>Docs</Button>
                </a>
                <a
                  href="https://www.unkey.com"
                  target="_blank"
                  className="text-violet-400"
                >
                  <Button variant={"default"}>Sign up</Button>
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col w-1/2 h-full p-6">
        <TerminalProvider>
          <Terminal
            sendRequest={(curl: string) => handleTerminalRequest(curl)}
            response={curlResponse}
            curlString={curlString}
            apiId={apiId ?? ""}
          />
        </TerminalProvider>
      </div>
    </div>
  );
}
