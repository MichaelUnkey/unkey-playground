"use client";

import CodeComponent from "./codeComponent";
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
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Curl Commands
  const [curlResponse, setCurlResponse] = useState<any>("");
  const [curlString, setCurlString] = useState<string>("");
  // Step Data
  const [step, setStep] = useState<number>(1);
  const [stepData, setStepData] = useState<any>();
  // const [currStepData, setCurrStepData] = useState<any>();
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

  useEffect(() => {
    setIsLoading(true);
    const data = StepData;
    setStepData(data);
    setIsLoading(false);
    console.log("Step Data", data);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.get("step")
      ? setStep(parseInt(params.get("step") as string))
      : setStep(1);
  }, [pathname, searchParams]);

  // Sets proper data based on step
  // Sets query string based on step change
  async function handleSteps(step: number) {
    router.push(pathname + "?" + createQueryString("step", step.toString()));
  }
  function parseCurlCommand(stepIndex: number) {
    let tempString = stepData[stepIndex].curlCommand.toString();
    const timeStamp = (Date.now() + 24 * 60 * 60 * 1000);
    console.log("TimeStamp", timeStamp);
    tempString = tempString.replace("<timeStamp>", timeStamp);
    if (apiId !== "" || apiId !== undefined) {
      tempString = tempString.replace("<apiId>", apiId);
    }
    if (keyId !== "" || keyId !== undefined) {
      tempString = tempString.replace("<keyId>", keyId);
    }
    if (keyName !== "" || keyName !== undefined) {
      tempString = tempString.replace("<key>", keyName);
    }
    const curlString = tempString;
    setCurlString(curlString);
    return curlString;
  }

  // Handles click event to call this steps curl command
  async function handleClick(stepIndex: number) {
    // Set current step and curl Command from clicked step

    const curlString = parseCurlCommand(stepIndex);
    console.log("returned curl string", curlString);

    const response = await HandleCurl(curlString, keyId ?? "", keyName ?? "");
    const resJson = JSON.parse(response);
    // console.log("Response", response);
    setCurlResponse(response);
    // const resJson = curl2Json(response);
    console.log("Response JSON", resJson);

    if (resJson.keyId && resJson.key) {
      setKeyId(resJson.keyId);
      setKeyName(resJson.key);
    }
  }

  // function handleTerminalRequest(curl: string) {
  //   const url = GetUrlFromString(curl, keyId ?? "");
  //   //console.log("Terminal", curl, "URL from Helper", url);
  // }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-1/2 h-full scroll-smooth">
        <Accordion type="single" collapsible value={`step${step.toString()}`}>
          <AccordionItem value="step1">
            <AccordionTrigger onFocus={() => handleSteps(1)}>
              1. Create Key
            </AccordionTrigger>
            <AccordionContent className="AccordionContent">
              <div className="flex flex-col gap-4 ">
                <p>Creating a key for your users can be done in two ways. </p>
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

                <p>{`Replace the <apiId> with: ${apiId}`}</p>
                <p>{`Leave the <token> tag for now. This is normally where you would put your root key. For now we will handle this for you. Everything else you can input youself.`}</p>
                <p>Example</p>
                {/* <div>{stepData ? JSON.stringify(stepData?.step1) : ""}</div> */}
                {/* <CodeComponent val={'this is shit'} />  */}

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
              <p>Example</p>
              <CodeComponent
                val={`curl --request GET \
  --url https://api.unkey.dev/v1/keys.getKey?keyId=key_12345 \
  --header 'Authorization: Bearer <token>'`}
              />
              <p>Example</p>
              <CodeComponent
                val={`{
	"id":"key_12345",
	"start":"test_1234",
	"apiId":"api_12345",
	"workspaceId":"ws_12345",
	"meta":{},
	"createdAt":1713891646582,
	"ratelimit":{},
	"roles":[],
	"permissions":[],
	"enabled":true
}`}
              />
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
              <p>Example</p>
              <CodeComponent
                val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.verifyKey \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234",
  "key": "sk_1234"
}'`}
              />
              <p>Example</p>
              <CodeComponent
                val={`{
    "keyId": "key_12345",
    "valid": true,
    "enabled": true,
    "permissions": []
}`}
              />
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
              <p>Same story here: </p>
              <p>Example</p>
              <CodeComponent
                val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "keyId": "key_1234",
  "name": "Customer X",
  "ownerId": "user_123",
}'`}
              />
              <p>Example</p>
              <CodeComponent val={`{}`} />
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
              <p>Example</p>
              <CodeComponent
                val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "expires": <TimeStamp>,
}'`}
              />
              <p>Again we provide a just do the thing button for you. </p>
              <p>Example</p>
              <CodeComponent val={`{}`} />
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
              <p>Example</p>
              <CodeComponent
                val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.verifyKey \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234",
  "key": "sk_1234"
}'`}
              />
              <p>Example</p>
              <CodeComponent
                val={`{
    "keyId": "key_12345",
    "valid": true,
    "enabled": true,
    "permissions": []
}`}
              />
              <p>
                Seems like your key is still active and can be used by the user.{" "}
              </p>
              <p>
                One more step and will crush your non paying users dreams and
                Revoke his key 😊
              </p>
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
              <p>Example</p>
              <CodeComponent
                val={`curl --request GET \
  --url https://api.unkey.dev/v1/keys.getVerifications?keyId=<keyId> \
  --header 'Authorization: Bearer <token>'`}
              />
              <p>Example</p>
              <CodeComponent
                val={`{
    "verifications": [
        {
            "time": 1713830400000,
            "success": 4,
            "rateLimited": 0,
            "usageExceeded": 0
        }
    ]
}`}
              />
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
              <p>Example</p>
              <CodeComponent
                val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "enabled": false,
}'`}
              />
              <p>Example</p>
              <CodeComponent val={`{}`} />
              <Button onClick={() => handleClick(8)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step9">
            <AccordionTrigger onFocus={() => handleSteps(9)}>
              Sign Up
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Now that you have seen some of what our platform has to offer.
                Sign up today and elevate your user management experience!
              </p>
              <Button onClick={() => handleClick(9)} variant={"outline"}>
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
            sendRequest={(curl: string) => ""}
            response={curlResponse}
            curlString={curlString}
            apiId={apiId ?? ""}
          />
        </TerminalProvider>
      </div>
    </div>
  );
}
