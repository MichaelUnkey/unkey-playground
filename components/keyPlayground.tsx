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
import {
  GetData,
  GetUrlFromString,
  HandleCurl,
  SwapValues,
} from "../lib/helper";
import { GetKeyCommand, CreateKeyCommand, VerifyKeyCommand } from "@/lib/unkey";

export default function KeyPlayground(props: any) {
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const testKey = {
    keyId: "key_2zD5eYaRgPHd5GFQvJK2gXiMFzCn",
    key: "3ZbCyxLeugPg8k289354CUYw",
  };
  const testing = true;
  // Curl Commands
  const [curlResponse, setCurlResponse] = useState<any>("");
  const [curlString, setCurlString] = useState<string>("");
  // Step Data
  const [step, setStep] = useState<number>(1);
  const [stepData, setStepData] = useState<JSON>();
  const [currStepData, setCurrStepData] = useState<any>();
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
    fetch("api/getData")
      .then((res) => res.json())
      .then((data) => {
        setStepData(data);
        setIsLoading(false);
      });
    console.log("Step Data", stepData);
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
    if (stepData) {
      Object.keys(stepData).filter((key) => {
        if (key === `step${step}`) {
          setCurrStepData(key);
        }
      });

      router.push(pathname + "?" + createQueryString("step", step.toString()));
    }
  }

  // Handles click event to call this steps curl command
  async function handleClick(stepIndex: number) {
    //console.log("stepData", stepData);

    // Check if step data is available
    if (currStepData) {
      let temp = await stepData;
      let curl = currStepData.curlCommand;
      currStepData.curlInput = curl;
      setStepData(temp);
      setCurlString(curl);
      //console.log("step for handle click", step);
      switch (stepIndex) {
        case 1:
          if (testing) {
            //console.log("testKey", testKey);
            setKeyId(`${testKey.keyId}`);
            setKeyName(`${testKey.key}`);
            setTimeout(() => {
              setCurlResponse(
                `{ key: ${testKey.key}, keyId: ${testKey.keyId} }`
              );
              //console.log("Step 1 - Key Id", keyId, "Key Name", keyName);
              //console.log("Step 1 - Curl Response", curlResponse);
            }, 2000);

            break;
          } else {
            const res = await CreateKeyCommand(apiId ?? "");
            //console.log("Create Key Response", res);
            const key = res;
            if (key.keyId && key.key) {
              setKeyId(testKey.keyId);
              setKeyName(testKey.key);
            }
            setCurlResponse(key);
          }
        case 2:
          //console.log("Step 2 KeyId", keyId, "KeyName", keyName);

          // if (keyId && testing) {
          //   setCurlResponse(`{
          //     "id": keyId,
          //     "start":"test",
          //     "apiId": apiId,
          //     "workspaceId":"ws_12345",
          //     "meta":{},
          //     "createdAt":1713891646582,
          //     "ratelimit":{},
          //     "roles":[],
          //     "permissions":[],
          //     "enabled":true
          //   }`);
          //   break;
          // }

          if (keyId) {
            //console.log("Key Id", keyId);
            const resStepTwo = await GetKeyCommand(keyId ?? "");
            const getKeyData = resStepTwo;
            setCurlResponse(JSON.stringify(getKeyData));
            //console.log("Get Key Response", getKeyData);
          } else {
            setCurlResponse("Key Id not found");
          }

          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;
        case 9:
          break;
        default:
          break;
      }
      //const response = await HandleCurl(curl, step, keyId ?? undefined, testing ).then((res) => res);
      // if (response) {
      //   setCurlResponse(JSON.stringify(response));
      //   const temp = response;
      //   setKeyId(JSON.stringify(response ? response.keyId : ""));
      //   setKeyName(JSON.stringify(response.key));
      //   console.log("keyId", keyId, "keyName", keyName);
      //   console.log("curlResponse", curlResponse);
      //   console.log("Response", response);
      //   setBufferedContent((previous) => (
      //     <>
      //       {previous}
      //       <span>--------------------------</span>
      //       <span>{response.toString()}</span>
      //       {<br />}
      //     </>
      //   ));
      // }
    }
    // setTimeout(() => {
    //   console.log("keyId", keyId, "keyName", keyName);
    // }, 2000);
  }

  function handleTerminalRequest(curl: string) {
    const url = GetUrlFromString(curl, keyId ?? "");
    //console.log("Terminal", curl, "URL from Helper", url);
  }

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
              <Button onClick={() => handleSteps(3)} variant={"outline"}>
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
              <Button onClick={() => handleSteps(4)} variant={"outline"}>
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
              <Button onClick={() => handleSteps(5)} variant={"outline"}>
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
              <Button onClick={() => handleSteps(6)} variant={"outline"}>
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
              <Button onClick={() => handleSteps(7)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step8">
            <AccordionTrigger onFocus={() => handleSteps(8)}>
              8. Revoke Key
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
              <Button onClick={() => handleSteps(8)} variant={"outline"}>
                Test
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step9">
            <AccordionTrigger onFocus={() => handleSteps(10)}>
              Sign Up
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Now that you have seen some of what our platform has to offer.
                Sign up today and elevate your user management experience!
              </p>
              <Button onClick={() => handleSteps(10)} variant={"outline"}>
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
