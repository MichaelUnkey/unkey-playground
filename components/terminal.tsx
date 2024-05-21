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
        <strong>curl</strong> - Sends a curl request. <br />
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
    curl: async (curl: any) => {
      if(curl === "") return "Please enter a valid curl command";
      setAllowInput(false);
      setCurl(curl);
      props.sendRequest(curl);
      console.log("curl", curl);
    },
    curlCommand: async (curl: any) => {
      setAllowInput(false);
      setBufferedContent((previous) => (
        <>
          {previous}
          <span>--------------------------</span>
          <br />
          <span>{curl}</span>
          {<br />}
        </>
      ));
    },
    curlResponse: async (response: any) => {
      
      setBufferedContent((previous) => (
        <>
          {previous}
          <span>--------------------------</span>
          <br />
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
      <ReactTerminal
        className="h-64"
        //scrollToBottom={true}
        themes={{
          "my-custom-theme": {
            themeBGColor: "#272B36",
            themeToolbarColor: "#DBDBDB",
            themeColor: "#FFFEFC",
            themePromptColor: "#a917a8",
            
          }
        }}
        theme="my-custom-theme"
        enableInput={allowInput}
        setInput={"Input"}
        prompt={prompt}
        //theme={theme}
        showControlBar={controlBar}
        showControlButtons={controlButtons}
        welcomeMessage={welcomeMessage}
        commands={commands}
        defaultHandler={(command: string, commandArguments: string) => {
          return `${command} passed on to default handler with arguments ${commandArguments}`;
        }}
      />
  );
}

export default Terminal;
