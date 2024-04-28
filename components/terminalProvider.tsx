'use client'
 
import { TerminalContextProvider } from "react-terminal"
import { createContext } from "react"
 
export const TerminalContext = createContext({})
 
export default function TerminalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (<TerminalContext.Provider value={TerminalContextProvider}>{children}</TerminalContext.Provider>)
}