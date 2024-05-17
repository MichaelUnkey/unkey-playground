"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function PlaygroundAccordion(props: {
  handleClick: (index: number) => void;
  handleSteps: (index: number) => void;
  stepData: any;
  apiId: string | undefined;
  keyId: string | undefined;
  key: string | undefined;
}) {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [apiId, setApiId] = useState("");
  const [keyId, setKeyId] = useState("");
  const [key, setKey] = useState("");
  const [stepData, setStepData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let temp = stepData.forEach(element => {
      
    });
      
    });
    setStepData(stepData);
    setIsLoading(false);
  }, [props.stepData]);
  useEffect(() => {
    setApiId(apiId);
  }, [props.apiId]);
  useEffect(() => {
    setKeyId(keyId);
  }, [props.keyId]);
  useEffect(() => {
    setKey(key);
  }, [props.key]);
  function handleClick(index: number) {
    props.handleClick(index);
  }
  function handleSteps(index: number) {
    props.handleSteps(index);
  }
  return isLoading ? (
    <div>Loading...</div>
  ) : (
 
        <Accordion type="single" collapsible value={`step${step.toString()}`}>
          {stepData.map((step: any) => {
            return (
              <AccordionItem
                key={step.step}
                value={`step${step.step.toString()}`}
              >
                <AccordionTrigger>
                  <div className="flex flex-row justify-between items-center p-4">
                    <div className="flex flex-col">
                      <div className="text-lg font-bold">{`Step-${step} ${step.name}`}</div>
                      <div className="text-sm">{step.blurb}</div>
                    </div>
                    <Button
                      onClick={() => {
                        handleClick(step.step);
                      }}
                      className="bg-blue-500 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4">
                    <pre>{step.curlCommand}</pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
   
  );
}
