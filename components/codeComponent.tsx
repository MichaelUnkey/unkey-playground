
import { dracula, CodeBlock } from "react-code-blocks"; 
  
export default function CodeComponent(props: { val: string }) { 
  return ( 
    <div className="my-4"> 
      <h3 className="my-2">Create Key</h3> 
      <CodeBlock
      text={props.val}
      language='typescript'
      showLineNumbers={true} 
      theme={dracula}
      wrapLongLines={false}
    /> 
    </div> 
  ); 
}