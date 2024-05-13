import KeyPlayground from "@/components/keyPlayground";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto w-full justify-center">
      <div className="flex flex-col mx-auto w-full justify-center max-w-[1440px]">
        <div className="mt-32">
          <h2 className="text-2xl">Unkey Playground</h2>
        </div>
        <div className="flex w-full mt-8 h-screen bg-gray-900 p-8 rounded-2xl ring-4 ring-purple-600">
         
            <KeyPlayground className="" />
         
        </div>
      </div>
    </div>
  );
}
