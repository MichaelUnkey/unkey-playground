"use client";

import TerminalProvider from "./terminalProvider";
import Terminal from "./terminal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { handleCurlServer } from "../lib/helper";
import { type stepDataType, data } from "@/lib/data";
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10, Step11 } from "./stepComponents";


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
const [timeStamp, setTimeStamp] = useState<number>(0);
  const [keyId, setKeyId] = useState<string>("");
  const [keyName, setKeyName] = useState<string>("");
  // Router
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
      
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);
  //     return params.toString();
  //   },
  //   [searchParams]
  // );


  useEffect(() => {
    if(!isMounted) {
      setTimeStamp(Date.now() + 24 * 60 * 60 * 1000);
    };
    setIsMounted(true);
  }, [isMounted]);

  
  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.get("step")
  //     ? setStep(parseInt(params.get("step") as string))
  //     : setStep(1);
  // }, [pathname, searchParams]);

  function handleSteps(step: number) {
    setStep(step);
  }

 

  const parseCurlCommand = useCallback((stepString: string) => {
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
  }, [apiId, keyId, keyName, timeStamp]);

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
        stepData[2].curlCommand = parseCurlCommand(
          stepData[2].curlCommand ?? ""
        );
      }

      handleRender(step + 1);
      handleSteps(step + 1);
      setCurlResponse(JSON.stringify(result));
    }
  }
  async function handleTerminalRequest(curlString: string) {
    handleCurl(curlString);
  }
  const handleRender = useCallback((index: number) => {
    if (stepData) {
      let tempString = stepData[index].curlCommand ?? "";
      const curlString = parseCurlCommand(tempString);
      setRenderString(curlString);
    }
  }, [ parseCurlCommand, stepData]);
  
  // useEffect(() => {
  //   handleRender(step);
  // }, [handleRender, step]);

  
  return !stepData ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col text-white/60">
      {Step1(step, apiId ?? "", stepData, handleButtonClick)}
      {Step2(step, keyId, stepData, renderString, handleButtonClick)}
      {Step3(
        step,
        apiId ?? "",
        keyId,
        stepData,
        renderString,
        handleButtonClick
      )}
      {Step4(step, keyId, stepData, renderString, handleButtonClick)}
      {Step5(
        step,
        stepData,
        renderString,
        handleButtonClick,
        apiId ?? "",
        keyName
      )}
      {Step6(step, timeStamp, keyId, stepData, renderString, handleButtonClick)}
      {Step7(
        step,
        keyId,
        stepData,
        renderString,
        apiId ?? "",
        keyName,
        handleButtonClick
      )}
      {Step8(step, keyId, stepData, renderString, handleButtonClick)}
      {Step9(step, keyId, stepData, renderString, handleButtonClick)}
      {Step10(
        step,
        apiId ?? "",
        keyName,
        stepData,
        renderString,
        handleButtonClick
      )}
      {Step11(step, stepData)}
      <div className="mt-10 h-96">
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














