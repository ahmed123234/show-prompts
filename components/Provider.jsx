// beacuse we gonna use the browser's capabilities we will use "use client directive"
"use client"
import { SessionProvider } from "next-auth/react"

/***
 * define higher oreder Component : which means 
 * you can wrap other component with it 
 *
 * also destructure the props object: that have 
 * two objects the children and the current session 
*/
const Provider = ({ children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider