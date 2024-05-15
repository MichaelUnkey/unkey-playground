import { dracula, CodeBlock, CopyBlock } from "react-code-blocks";

export default function CodeComponent(props: { val: string }) {
  return (

    <CodeBlock
      text={props.val}
      language="typescript"
      showLineNumbers={true}
      theme={dracula}
      wrapLongLines={false}
    />
    
  );
}
