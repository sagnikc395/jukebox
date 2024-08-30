
//all of these providers need to wrap our full application 
"use client"; 

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: {
    children: React.ReactNode
}) {
    return <SessionProvider>
        {children}
    </SessionProvider>
}