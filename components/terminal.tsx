"use client";
import React, { useState, useContext, useEffect } from "react";
import { ReactTerminal, TerminalContext } from "react-terminal";
import { usePathname, useSearchParams } from "next/navigation";
import curl2Json from "@bany/curl-to-json";

function Terminal(props: {
  data: any;
  command: string;
  sendKey: { key: string; keyId: string };
  step: string;
  setData: (input: string) => void;
  isCommandSent: boolean;
  inputFromTerminal: (isDone: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);
  const [command, setCommand] = React.useState(props.command);
  const [keyObject, setKeyObject] = React.useState(props.sendKey);
  const [inputTerminal, setInputTerminal] = React.useState<boolean>(props.isCommandSent);
  const [stepsData, setStepsData] = React.useState(props.data);
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const { setBufferedContent, setTemporaryContent } =
    useContext(TerminalContext);
  const [theme, setTheme] = useState("dark");
  const [controlBar, setControlBar] = useState(false);
  const [controlButtons, setControlButtons] = useState(false);
  const [prompt, setPrompt] = useState(">>>");
  const step = searchParams.get("step");
  const urls = {
    createKey: "https://api.unkey.dev/v1/keys.createKey",
    getkey: "https://api.unkey.dev/v1/keys.getKey",
    verifyKey: "https://api.unkey.dev/v1/keys.verifyKey",
    updateKey: "https://api.unkey.dev/v1/keys.updateKey",
    getVerifications: "https://api.unkey.dev/v1/keys.getVerifications",
  };
  

  if (!apiId) {
    return <div>Api id not found</div>;
  }
  if (isFirstLoad) {
    return <div>Loading...</div>;
  }

  const commands = {
    help: (
      <span>
        <strong>clear</strong> - clears the console. <br />
        <strong>change_prompt &lt;PROMPT&gt;</strong> - Change the prompt of the
        terminal. <br />
        <strong>change_theme &lt;THEME&gt;</strong> - Changes the theme of the
        terminal. Allowed themes - light, dark, material-light, material-dark,
        material-ocean, matrix and dracula. <br />
        <strong>toggle_control_bar</strong> - Hides / Display the top controlpn
        bar. <br />
        <strong>toggle_control_buttons</strong> - Hides / Display the top
        buttons on control bar. <br />
        <strong>evaluate_math_expression &lt;EXPR&gt;</strong> - Evaluates a
        mathematical expression (eg, <strong>4*4</strong>) by hitting a public
        API, api.mathjs.org. <br />
        <strong>wait &lt;TIME&gt;</strong> - Wait for TIME (seconds). <br />
        <strong>count_to &lt;NUM&gt;</strong> Count from 1 to NUM (integer).
      </span>
    ),

    change_prompt: (prompt: string) => {
      setPrompt(prompt);
    },

    change_theme: (theme: string) => {
      const validThemes = [
        "light",
        "dark",
        "material-light",
        "material-dark",
        "material-ocean",
        "matrix",
        "dracula",
      ];
      if (!validThemes.includes(theme)) {
        return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`;
      }
      setTheme(theme);
    },

    toggle_control_bar: () => {
      setControlBar(!controlBar);
    },

    toggle_control_buttons: () => {
      setControlButtons(!controlButtons);
    },

    evaluate_math_expression: async (expr: any) => {
      const response = await fetch(
        `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`
      );
      return await response.text();
    },

    wait: async (timeout: any) => {
      setTemporaryContent("Waiting...");
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(void 0);
        }, parseInt(timeout) * 1000)
      );
      return "Over!";
    },

    count_to: async (nb: any) => {
      await setTemporaryContent("Counting...");
      nb = parseInt(nb);
      await Promise.all(
        new Array(nb).fill({}).map(
          (value, index) =>
            new Promise((resolve) => {
              const timer = setTimeout(() => {
                setBufferedContent((previous) => (
                  <>
                    {previous}
                    <span>{index + 1}</span>
                    {index + 1 < nb ? <br /> : ""}
                  </>
                ));
                clearTimeout(timer);
                resolve(void 0);
              }, index * 1000);
            })
        )
      );
      return (
        <>
          <br />
          Finished
        </>
      );
    },
    test: async (args: any) => {
      setBufferedContent((previous) => (
        <>
          {previous}
          <span>Buffered</span>
          {<br />}
        </>
      ));
    },
    curl: async (curl: any) => {
      const req = curl2Json(curl);

      const body = JSON.stringify(req.data);
      const keyId = req.params?.keyId;
      let url = req.url;
      const method = req.method;
      switch (url) {
        case urls.createKey:
          url = "/api/createKey";
          break;
        case urls.getkey:
          url = `/api/getKey?keyId=${keyId}`;
          break;
        case urls.verifyKey:
          url = "/api/verifyKey";
          break;
        case urls.updateKey:
          url = "/api/updateKey";
          break;
        case urls.getVerifications:
          url = "/api/getVerifications";
          break;
        default:
      }

      const res = await fetch(url);
      if (res.ok) {
        setKeyObject(await res.json());
        return <span>`${JSON.stringify(res.json)}`</span>;
      }
      if (res) {
        return res;
      }
      return <span>error</span>;
    },
  };
  const welcomeMessage = (
    <span>
      Type &quot;help&quot; for all available commands. <br />
    </span>
  );
  async function test() {
    await setBufferedContent((previous) => (
      <>
        {previous}
        <span>Buffered Test</span>
        {<br />}
      </>
    ));
  }
  useEffect(() => {
    console.log("input terminal", inputTerminal);
    if (isFirstLoad) {
      setStepsData(props.data);
      setIsFirstLoad(false);
      console.log("Terminal first load", isFirstLoad);
    }
    if (inputTerminal && !isFirstLoad) {
      setBufferedContent((previous) => (
        <>
          {previous}
          <span>{command}</span>
          {<br />}
        </>
      ));
      props.inputFromTerminal(false);
      setCommand("");
      setInputTerminal(false);
    }
  }, [inputTerminal, command]);

  return (
    <div className="h-[1000px]">
      <p className="my-6"></p>
      <button onClick={test}>Test</button>
      <ReactTerminal
        //setTemporaryContent={() => setTemporaryContent("Working...")}

        setTemporaryContent={"Temporary"}
        setInput={"Input"}
        prompt={prompt}
        theme={theme}
        showControlBar={controlBar}
        showControlButtons={controlButtons}
        welcomeMessage={welcomeMessage}
        commands={commands}
        defaultHandler={(command: string, commandArguments: string) => {
          return `${command} passed on to default handler with arguments ${commandArguments}`;
        }}
      />
    </div>
  );
}

export default Terminal;
