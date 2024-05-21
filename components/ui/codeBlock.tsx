"use client";
import { CopyButton } from "./copyButton";
import { cn } from "@/lib/utils";
import { Highlight } from "prism-react-renderer";
import { useEffect, useState } from "react";
import React from "react";
import darkTheme from "./darkTheme";


export function CodeBlock({ className, children }: any) {

  const [copyData, setCopyData] = useState(children ?? '');

  useEffect(() => {
    setCopyData(children);
  }, [children]);
  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([copyData], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "code.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  return (
    <div
      className={cn(
        "flex flex-col bg-gradient-to-t from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.07)] rounded-[10px] border-[.5px] border-[rgba(255,255,255,0.1)]",
        className,
      )}
    >
      <div className="flex flex-row justify-end gap-4 mt-2 mr-4 border-white/10">
        <CopyButton value={copyData} />
        <button
          type="button"
          aria-label="Download code"
          className="p-0 m-0 align-top bg-transparent"
          onClick={handleDownload}
        >
        </button>
      </div>
      <Highlight
        theme={darkTheme}
        code={children.trim()}
        language={className?.replace(/language-/, "") || "jsx"}
      >
        {({ tokens, getLineProps, getTokenProps }) => {
          return (
            <div key="mainSection" className="pt-0 pb-5 mt-0 overflow-x-auto leading-7 bg-transparent border-none rounded-none">
              {tokens.map((line, i) => {
                // if the last line is empty, don't render it
                if (i === tokens.length - 1 && line[0].empty === true) {
                  return ;
                }
                return (
                  <pre
                    // biome-ignore lint/suspicious/noArrayIndexKey: I got nothing better right now
                    key={`${line}-${i}`}
                    {...getLineProps({ line })}
                  >
                    <span key={`${line}-${i}`} className="pl-4 pr-8 text-center text-white/20">{i + 1}</span>
                    {line.map((token, key) => (
                      <span key={`${key}-${token}`} {...getTokenProps({ token })} />
                    ))}
                  </pre>
                );
              })}
            </div>
          );
        }}
      </Highlight>
    
    
    </div>
  );
}