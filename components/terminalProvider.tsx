'use client'
 
import { TerminalContextProvider } from "react-terminal"
//  export const terminalContext = TerminalContext;
export default function TerminalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (<TerminalContextProvider>{children}</TerminalContextProvider>)
}