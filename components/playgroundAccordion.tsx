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
import { StepData } from "@/lib/data";

export default function PlaygroundComponent(props: {
  handleClick: (index: number) => void;
}) {
  const { handleClick } = props;
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [step, setStep] = useState<number>(1);
  const [stepData, setStepData] = useState<any>();

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

  async function handleSteps(step: number) {
    router.push(pathname + "?" + createQueryString("step", step.toString()));
  }
  const AccordionMap = stepData?.map((step: any) => {
    return (
      <AccordionItem value={`step${step.step}`}>
        <AccordionTrigger onFocus={() => handleSteps(step.step)}>
          {step.name}
        </AccordionTrigger>
        <AccordionContent>
          <div>{step.curlCommand}</div>
          <Button onClick={() => handleClick(step.step)} variant={"outline"}>
            Test
          </Button>
        </AccordionContent>
      </AccordionItem>
    );
  });
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-1/2 h-full scroll-smooth">
        <Accordion type="single" collapsible value={`step${step.toString()}`}>
          <AccordionMap />
        </Accordion>
      </div>
    </div>
  );
}
