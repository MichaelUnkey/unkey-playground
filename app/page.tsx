import KeyPlayground from "@/components/keyPlayground";

export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center">
      <div className="mx-auto w-full justify-center max-w-[1440px]">
        <h1 className="section-title-heading-gradient max-sm:mx-6 max-sm:text-4xl font-medium text-[4rem] leading-[4rem] max-w-xl text-left mt-16 py-2">
          Unkey API Playground
        </h1>
        <KeyPlayground />
      </div>
    </div>
  );
}
