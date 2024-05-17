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
import { HandleCurl } from "../lib/helper";
import { StepData } from "@/lib/data";

export default function KeyPlayground(props: any) {
  const Data = StepData;
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Curl Commands
  const [curlResponse, setCurlResponse] = useState<any>("");
  const [curlString, setCurlString] = useState<string>("");
  const [renderString, setRenderString] = useState<string>("");
  // Step Data
  const [step, setStep] = useState<number>(1);
  const [stepData, setStepData] = useState<any>(Data);
  // Shared Data
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
    [searchParams]
  );
  type StepDataType = StepDataItem[];
  type StepDataItem = {
    step: number;
    name: string;
    blurb: string | undefined;
    curlCommand: string | undefined;
  };
  useEffect(() => {
    if (isLoading) {
      setIsLoading(true);
      setStepData(Data);
      setStep(1);
      setIsLoading(false);
    }
  }, []);

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
    //console.log("Step set: ", step);
    handleRender(step);
  }, [step]);

  function parseCurlCommand(stepString: string) {
    let tempString = stepString;
    const timeStamp = Date.now() + 24 * 60 * 60 * 1000;
    
    tempString = tempString.replace("<timeStamp>", timeStamp.toString());
    if(apiId){
      tempString = apiId.length > 0 ? tempString.replace("<apiId>", apiId) : tempString;
    }
    tempString = keyId.length > 0 ? tempString.replace("<keyId>", keyId) : tempString;
    tempString = keyName.length > 0 ? tempString.replace("<key>", keyName) : tempString;
    return tempString;
  }

  async function handleClick(index: number) {
    let tempString = stepData[index].curlCommand.toString();
    const curlString = parseCurlCommand(tempString);
    handleCurl(curlString);
  }

  async function handleCurl(curlString: string) {
    setCurlString(curlString);
    curlString = curlString.replace("--data", "--data-raw");
    console.log("Curl String", curlString);
    
    const response = await HandleCurl(curlString);
    console.log("Response From Playground", response);
    
    if (response) {
      const resJson = JSON.parse(response);
      if (resJson.error) {
        return { error: "error" };
      }
      if (step === 1) {
        setKeyId(resJson.keyId);
        setKeyName(resJson.key);
        stepData[2].curlCommand = parseCurlCommand(stepData[2].curlCommand);
      }

      handleRender(step + 1);
      handleSteps(step + 1);
      setCurlResponse(response);
    }
  }
  async function handleTerminalRequest(curlString: string) {
    handleCurl(curlString);
  }
  async function handleRender(index: number) {
    if (stepData) {
      let tempString = stepData[index].curlCommand.toString();
      const curlString = parseCurlCommand(tempString);
      setRenderString(curlString);
    }
  }
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-1/2 h-full scroll-smooth">
        <Accordion type="single" collapsible value={`step${step.toString()}`}>
          <AccordionItem value="step1">
            <p className="text-center text-lg">
              Welcome to the Unkey playground.
            </p>
            <p className="text-center text-lg mt-2">
              Here you can test out the Unkey API without signing up to get an
              idea of how it works.{" "}
            </p>
            <AccordionTrigger onFocus={() => handleSteps(1)} className="mt-6">
              1. Create Key
            </AccordionTrigger>
            <AccordionContent className="AccordionContent">
              <div className="flex flex-col gap-4 ">
                <p>
                  Welcome to the Unkey playground. Here you can test out the
                  Unkey API. Click on 'Next' or step 1 to begin.{" "}
                </p>
                <p>
                  The first is using the Unkey API at the following:
                  https://api.unkey.dev/v1/keys.createKey
                </p>
                <p>
                  This can be done with a curl command. The bearer token and
                  apiId are both required. For now we can use some fake values.
                  In the terminal window paste or type the following curl
                  command.
                </p>

                <p>{`Leave the <token> tag for now. This is normally where you would put your root key. For now we will handle this for you. Everything else you can input youself.`}</p>
                <CodeBlock className="">{stepData[1].curlCommand}</CodeBlock>

                {
                  <div className="flex justify-end">
                    <Button
                      className="lg:w-1/4"
                      onClick={() => handleClick(1)}
                      variant={"outline"}
                    >
                      Do it for me
                    </Button>
                  </div>
                }
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step2">
            <AccordionTrigger onFocus={() => handleSteps(2)}>
              2. Get Key
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Next we can retrieve a key by its ID. Like before, either use
                the terminal or the button.
              </p>
              <p className="my-4 text-teal-700">{keyId}</p>

              <CodeBlock className="">{renderString}</CodeBlock>
              {
                <div className="flex justify-end">
                  <Button
                    className="lg:w-1/4"
                    onClick={() => handleClick(2)}
                    variant={"outline"}
                  >
                    Do it for me
                  </Button>
                </div>
              }
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step3">
            <AccordionTrigger onFocus={() => handleSteps(3)}>
              3. Verify Key
            </AccordionTrigger>
            <AccordionContent>
              <p>
                use the command of button to verify the key we just got back in
                the last step. Feel free to do this step a few times. This will
                give you a few more points on the fancy chart later on.{" "}
              </p>
              <CodeBlock className="">{renderString}</CodeBlock>

              <Button onClick={() => handleClick(3)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step4">
            <AccordionTrigger onFocus={() => handleSteps(4)}>
              4. Update Key
            </AccordionTrigger>
            <AccordionContent>
              <CodeBlock className="">{renderString}</CodeBlock>
              <p>Example</p>
              <Button onClick={() => handleClick(4)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step5">
            <AccordionTrigger onFocus={() => handleSteps(5)}>
              5. Add Expiration
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Same thing again but expiration instead of ownerId and name. The
                input required is “expires”: UnixTimestampMiliseconds
              </p>
              <p>
                To help help here is a button that will copy the current unix
                timestamp plus 1 day. Feel free to use your own value if you
                want.{" "}
              </p>
              <CodeBlock className="">{renderString}</CodeBlock>
              <p>Again we provide a just do the thing button for you. </p>

              <Button onClick={() => handleClick(5)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step6">
            <AccordionTrigger onFocus={() => handleSteps(6)}>
              6. Verify Key
            </AccordionTrigger>
            <AccordionContent>
              <p>
                use the command of button to verify the key we just got back in
                the last step. Feel free to do this step a few times. This will
                give you a few more points on the fancy chart later on.{" "}
              </p>

              <CodeBlock className="">{renderString}</CodeBlock>

              <Button onClick={() => handleClick(6)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step7">
            <AccordionTrigger onFocus={() => handleSteps(7)}>
              7. Show Analytics
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Next we can get some analytics data on this key. This can also
                be done based on apiId or ownerId. But here we will keep it
                simple
              </p>
              <CodeBlock className="">{renderString}</CodeBlock>

              <Button onClick={() => handleClick(7)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step8">
            <AccordionTrigger onFocus={() => handleSteps(8)}>
              8. Delete Key
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Lets say for whatever reason you want to revoke access to a key.
                This can be done using the same updateKey endpoint we have used
                before. Only this time we will set enabled to false. This will
                make sure that if the key is used to verify a user it will
                return <span>UNAUTHORIZED</span>.{" "}
              </p>

              <CodeBlock className="">{renderString}</CodeBlock>

              <Button onClick={() => handleClick(8)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step9">
            <AccordionTrigger onFocus={() => handleSteps(9)}>
              9. Verify Key
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Lets say for whatever reason you want to revoke access to a key.
                This can be done using the same updateKey endpoint we have used
                before. Only this time we will set enabled to false. This will
                make sure that if the key is used to verify a user it will
                return <span>UNAUTHORIZED</span>.{" "}
              </p>
              <CodeBlock className="">{renderString}</CodeBlock>

              <Button onClick={() => handleClick(9)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step10">
            <AccordionTrigger onFocus={() => handleSteps(10)}>
              Sign Up
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Now that you have seen some of what our platform has to offer.
                Sign up today and elevate your user management experience!
              </p>
              <Button onClick={() => handleClick(10)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col w-1/2 h-full p-6">
        {/* <Link href="/?step=5">CLick me</Link> */}
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
