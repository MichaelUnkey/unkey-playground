import Link from "next/link";
import { type stepDataType } from "@/lib/data";
import { CodeBlock } from "./ui/codeBlock";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Step1(
  step: number,
  apiId: string,
  stepData: stepDataType,
  handleButtonClick: (index: number) => void
) {
  return (
    <div
      key="step1"
      className={cn(step === 1 ? "flex flex-col" : "hidden", "gap-4 mt-10")}
    >
      <h2 className="text-lg mt-6">Welcome to the Unkey API playground</h2>
      <p className="text-md mt-2">
        Here you can test out the Unkey API using curl commands to make Unkey
        API calls.
      </p>
      <h2 className="text-2xl">Create a first Key</h2>
      <p>
        Directions: Type commands in manualy, copy and paste, or just click the
        &quot;Send request&quot; button under each step. Leave the{" "}
        <span className=" text-white">&lt;token&gt;</span> tag for now. Normally
        you would put your root key here. We will handle any rootkey
        requirements in this playground.
      </p>
      <p>{stepData[1].blurb}</p>
      <p>
        See{" "}
        <Link
          className="text-white underline hover:text-white/60"
          href="https://www.unkey.com/docs/api-reference/keys/create"
        >
          create key docs.
        </Link>
      </p>
      <p>
        API ID: <span className="my-2 text-white">{apiId}</span>
      </p>

      <div className="my-8">
        <CodeBlock>{stepData[1].curlCommand}</CodeBlock>
      </div>
      <div className="flex justify-end">
        <Button
          className="lg:w-1/4"
          onClick={() => handleButtonClick(1)}
          variant={"ghost"}
        >
          <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
            <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                <span className="text-sm font-semibold text-white">
                  Send request
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export function Step2(
  step: number,
  keyId: string,
  stepData: stepDataType,
  renderString: string,
  handleButtonClick: (index: number) => void
) {
  return (
    <div
      key="step2"
      className={cn(step === 2 ? "flex flex-col" : "hidden", "gap-4 mt-12")}
    >
      <h2>Get Key Data</h2>
      <p>{stepData[2].blurb}</p>
      <p>
        keyId: <span className="my-2 text-white">{keyId}</span>
      </p>
      <div className="mt-8">
      <CodeBlock>{renderString}</CodeBlock>
      </div>
      <div className="flex justify-end">
        <Button
          className="lg:w-1/4"
          onClick={() => handleButtonClick(2)}
          variant={"ghost"}
        >
          <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
            <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                <span className="text-sm font-semibold text-white">
                  Send request
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export function Step3(
  step: number,
  apiId: string,
  keyId: string,
  stepData: stepDataType,
  renderString: string,
  handleButtonClick: (index: number) => void
) {
  return (
    <div
      key="step3"
      className={cn(step === 3 ? "flex" : "hidden", "gap-4 mt-12")}
    >
      <h2>Verify Key</h2>
      <p>{stepData[3].blurb}</p>
      <p>
        API ID: <span className="my-2 text-white">{apiId}</span>
      </p>
      <p>
        keyId: <span className="my-2 text-white">{keyId}</span>
      </p>
      <div className="mt-8">
        <CodeBlock>{renderString}</CodeBlock>
      </div>
      <div className="flex justify-end">
        <Button
          className="w-92"
          onClick={() => handleButtonClick(2)}
          variant={"ghost"}
        >
          <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
            <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                <span className="text-sm font-semibold text-white">
                  Send request
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export function Step4(
  step: number,
  keyId: string,
  stepData: stepDataType,
  renderString: string,
  handleButtonClick: (index: number) => void
) {
  return (
    <div key="step4" className={cn(step === 4 ? "flex flex-col" : "hidden")}>
      <h2>Update Key</h2>
      <p>{stepData[4].blurb}</p>
      <p>
        ownerId: <span className="my-2 text-violet-400">user_1234</span>
      </p>
      <p>
        keyId: <span className="my-2 text-violet-400">{keyId}</span>
      </p>
      <div className="my-8">
        <CodeBlock className="">{renderString}</CodeBlock>
      </div>
      <div className="flex justify-end">
        <Button
          className="lg:w-1/4"
          onClick={() => handleButtonClick(2)}
          variant={"ghost"}
        >
          <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
            <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                <span className="text-sm font-semibold text-white">
                  Send request
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export function Step5(
  step: number,
  stepData: stepDataType,
  renderString: string,
  handleButtonClick: (index: number) => void,
  apiId: string,
  keyName: string
) {
  return (
    <div key="step5" className={cn(step === 5 ? "flex-col" : "hidden")}>
      <h2>Verify Key</h2>
      <p>{stepData[5].blurb}</p>
      <p>
        API ID: <span className="my-2 text-violet-400">{apiId}</span>
      </p>
      <p>
        Key name: <span className="my-2 text-violet-400">{keyName}</span>
      </p>
      <div className="my-8">
        <CodeBlock className="">{renderString}</CodeBlock>
      </div>
      <div className="flex justify-end">
        <Button
          className="lg:w-1/4"
          onClick={() => handleButtonClick(2)}
          variant={"ghost"}
        >
          <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
            <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                <span className="text-sm font-semibold text-white">
                  Send request
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export function Step6(
  step: number,
  timeStamp: number,
  keyId: string,
  stepData: stepDataType,
  renderString: string,
  handleButtonClick: (index: number) => void
) {
  return (
    <div key="step6" className={cn(step === 6 ? "flex-col" : "hidden")}>
      <h2>Update expiration</h2>
      <p>{stepData[6].blurb}</p>
      <p>
        Expiration: <span className="my-2 text-violet-400">{timeStamp}</span>
      </p>
      <p>
        keyId: <span className="my-2 text-violet-400">{keyId}</span>
      </p>
      <p>
        url: <span className="my-2 text-violet-400">{stepData[6].url}</span>
      </p>
      <p>headers:</p>
      <p className="pl-4">
        <span className="my-2 text-violet-400">
          {stepData[6]?.headers?.contentType}
        </span>
      </p>
      <p>
        method:{" "}
        <span className="my-2 text-violet-400">{stepData[6].method}</span>
      </p>
      <div className="my-8">
        <CodeBlock className="">{renderString}</CodeBlock>
      </div>
      <div className="flex justify-end">
        <Button
          className="lg:w-1/4"
          onClick={() => handleButtonClick(2)}
          variant={"ghost"}
        >
          <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
            <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                <span className="text-sm font-semibold text-white">
                  Send request
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export function Step7(
  step: number,
  keyId: string,
  stepData: stepDataType,
  renderString: string,
  apiId: string,
  keyName: string,
  handleButtonClick: (index: number) => void
) {
  return (
    <div key="step7" className={cn(step === 7 ? "flex-col" : "hidden")}>
      <h2>Verify Key</h2>
      <p>{stepData[7].blurb}</p>
      <p>
        API ID: <span className="my-2 text-violet-400">{apiId}</span>
      </p>
      <p>
        Key Name: <span className="my-2 text-violet-400">{keyName}</span>
      </p>
      <div className="my-8">
        <CodeBlock>{renderString}</CodeBlock>
      </div>
      <div className="flex justify-end">
        <Button
          className="lg:w-1/4"
          onClick={() => handleButtonClick(2)}
          variant={"ghost"}
        >
          <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
            <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                <span className="text-sm font-semibold text-white">
                  Send request
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export function Step8(
  step: number,
  keyId: string,
  stepData: stepDataType,
  renderString: string,
  handleButtonClick: (index: number) => void
) {
  return (
    <div key="step8" className={cn(step === 8 ? "flex-col" : "hidden")}>
      <h2> Verify Key</h2>
      <p>{stepData[8].blurb}</p>
      <p>
        keyId: <span className="my-2 text-violet-400">{keyId}</span>
      </p>
      <div className="my-8">
        <CodeBlock>{renderString}</CodeBlock>
      </div>
      <div className="flex justify-end">
        <Button
          className="lg:w-1/4"
          onClick={() => handleButtonClick(2)}
          variant={"ghost"}
        >
          <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
            <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                <span className="text-sm font-semibold text-white">
                  Send request
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export function Step9(
  step: number,
  keyId: string,
  stepData: stepDataType,
  renderString: string,
  handleButtonClick: (index: number) => void
) {
  return (
    <div key="step9" className={cn(step === 9 ? "flex" : "hidden")}>
      <h1>Delete Key</h1>
      <div className="flex flex-col gap-4 ">
        <p>{stepData[9].blurb}</p>
        <p>
          keyId: <span className="my-2 text-violet-400">{keyId}</span>
        </p>
        <div className="my-8">
          <CodeBlock>{renderString}</CodeBlock>
        </div>
        <div className="flex justify-end">
          <Button
            className="lg:w-1/4"
            onClick={() => handleButtonClick(2)}
            variant={"ghost"}
          >
            <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
              <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                  <span className="text-sm font-semibold text-white">
                    Send request
                  </span>
                </div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Step10(
  step: number,
  apiId: string,
  keyName: string,
  stepData: stepDataType,
  renderString: string,
  handleButtonClick: (index: number) => void
) {
  return (
    <div key="step10" className={cn(step === 10 ? "flex" : "hidden")}>
      <h1>Verify Key</h1>
      <p>{stepData[10].blurb}</p>
      <p>
        apiId: <span className="my-2 text-violet-400">{apiId}</span>
      </p>
      <p>
        key: <span className="my-2 text-violet-400">{keyName}</span>
      </p>
      <div className="my-8">
        <CodeBlock>{renderString}</CodeBlock>
      </div>
      <div className="flex flex-row justify-end">
        <div className="flex justify-end">
          <Button
            className="lg:w-1/4"
            onClick={() => handleButtonClick(2)}
            variant={"ghost"}
          >
            <div className="w-full p-px rounded-lg h-10 bg-gradient-to-r from-[#02DEFC] via-[#0239FC] to-[#7002FC] overflow-hidden">
              <div className="bg-black rounded-[7px] h-full bg-opacity-95 hover:bg-opacity-25 duration-1000">
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#02DEFC]/20 via-[#0239FC]/20 to-[#7002FC]/20  rounded-[7px]">
                  <span className="text-sm font-semibold text-white">
                    Send request
                  </span>
                </div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Step11(step: number, stepData: stepDataType) {
  return (
    <div
      key="step11"
      className={cn(step === 11 ? "flex flex-col" : "hidden", "w-full")}
    >
      <div className="flex flex-col w-full">
        <h3 className="text-xl">Congrats!</h3>
        <p>{stepData[11]?.blurb ?? "Sign up for an account to get started."}</p>
        <p>Learn more: </p>
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
      </div>
    </div>
  );
}
