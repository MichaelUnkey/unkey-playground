"use client";
import React, { useState, useContext, useEffect } from "react";
import { ReactTerminal, TerminalContext } from "react-terminal";

function Terminal(props: {
  sendRequest: (curl: string) => void;
  response: string;
  curlString: string;
  apiId: string;
}) {
  //Terminal Setup
  const { setBufferedContent, setTemporaryContent } =
    useContext(TerminalContext);
  const [theme, setTheme] = useState("dark");
  const [controlBar, setControlBar] = useState(false);
  const [controlButtons, setControlButtons] = useState(false);
  const [prompt, setPrompt] = useState(">>>");
  const [curl, setCurl] = useState("");
  const [response, setResponse] = useState("");
  const [allowInput, setAllowInput] = useState(true);

  useEffect(() => {
    if (props.curlString !== curl) {
      setCurl(props.curlString);
      commands.curlCommand(props.curlString);
    }
  }, [props.curlString]);

  useEffect(() => {
    setResponse(props.response);
    if (response !== props.response) {
      setResponse(props.response);
      commands.curlResponse(props.response);
      
    }
  }, [props.response]);

 
  const commands = {
    help: (
      <span>
        <span>--------------------------</span>
        <br />
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
      setAllowInput(false);
      setCurl(curl);
      props.sendRequest(curl);
      console.log("curl", curl);

      
    },
    curlCommand: async (curl: any) => {
      console.log("curlCommand In Terminal ---- ", curl);
      setAllowInput(false);
      setBufferedContent((previous) => (
        <>
          {previous}
          <span>--------------------------</span><br />
          <span>{curl}</span>
          {<br />}
        </>
      ));
      
    },
    curlResponse: async (response: any) => {
      console.log("curlResponse", response);
      
      setBufferedContent((previous) => (
        <>
          {previous}
          <span>--------------------------</span><br />
          <span>{response}</span>
          {<br />}
        </>
      ));
      setAllowInput(true);
    },
  };

  const welcomeMessage = (
    <span>
      Type &quot;help&quot; for all available commands. <br />
    </span>
  );

  return (
    <div className="h-[1000px]">
      <ReactTerminal
        enableInput={allowInput}
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
