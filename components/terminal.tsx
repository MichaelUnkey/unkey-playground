"use client";

import React, { useState, useContext, useEffect } from "react";
import { ReactTerminal, TerminalContext } from "react-terminal";

import { CreateKeyCommand, VerifyKeyCommand, GetKeyCommand } from "@/lib/unkey";
import { Button } from "./ui/button";

function Terminal(props: { current: string, data: any, sendKey: {key:string, keyId:string}, step: number, setData: (input:string) => void}) {
  const [keyObject, setKeyObject] = React.useState({ key: "", keyId: "" });
  const data = props.data;
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  const [currentTerminal, setCurrentTerminal] = useState(props.current);
  const { setBufferedContent, setTemporaryContent } = useContext(TerminalContext);
  const [theme, setTheme] = useState("dark");
  const [controlBar, setControlBar] = useState(false);
  const [controlButtons, setControlButtons] = useState(false);
  const [prompt, setPrompt] = useState(">>>");
  const step = props.step;


  useEffect(() => {
    console.log("Terminal", step);
    console.log("Terminal", data[step - 1].curlInput) ;
    
  }, [step, data]);
  if (!apiId) {
    return <div>Api id not found</div>;
  }

  function parseCommand(command: string) {
    const parts = command.split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);

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
              //console.log(value);

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

    curl: async (url: any) => {
      data[step - 1].curlInput = url;
      console.log(data);
      
    },
  };
  if (!apiId) {
    return <div>Api id not found</div>;
  }

  const welcomeMessage = (
    <span>
      Type &quot;help&quot; for all available commands. <br />
    </span>
  );

  async function createKeyTest() {
    if (!apiId) {
      return <div>Api id not found</div>;
    }
    const result = await CreateKeyCommand(apiId);
    if (!result.error && result.key && result.keyId) {
      setKeyObject(result);
    }
  }

  async function verifyKeyTest() {
    if (!keyObject.key || !apiId) {
      return <div>Api id not found</div>;
    }
    const result = await VerifyKeyCommand(keyObject.key, apiId);
    if (result) {
    }
  }
  async function setCommand() {
    // setTemporaryContent(`Working...`);
    //   await setTimeout(() => {
    //     setBufferedContent((previous) => (
    //       <>
    //         {previous}
    //         <br />
    //         <span>curl --request POST --url https://api.unkey.dev/v1/keys.createKey --header </span>
    //         <br />
    //       </>
    //     ));
    //   }, 3000);
    setTemporaryContent("Waiting...");
    await setTemporaryContent("Waiting...");

    return <br />;
  }
  // wait: async (timeout: any) => {
  //   setTemporaryContent("Waiting...");
  //   await new Promise((resolve) =>
  //     setTimeout(() => {
  //       resolve(void 0);
  //     }, parseInt(timeout) * 1000)
  //   );
  //   return "Over!";
  // },
  return (
    <div className="h-[1000px]">
      <Button
        onClick={() =>
          parseCommand(
            `curl --request POST --url https://api.unkey.dev/v1/keys.createKey --header 'Authorization: Bearer <token>' --header 'Content-Type: application/json' --data '{"apiId": "api_1234"}'`
          )
        }
      >
        Parse Command
      </Button>
      <Button onClick={() => createKeyTest()}>Create Key</Button>
      <Button onClick={() => verifyKeyTest()}>Verify Key</Button>
      <Button onClick={() => setCommand()}>Set Command</Button>
      <p>{currentTerminal}</p>
      <ReactTerminal
        setTemporaryContent={() => setTemporaryContent("Working...")}
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
