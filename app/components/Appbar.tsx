'use client';
import { signIn, useSession } from "next-auth/react"
import { signOut } from "next-auth/react";

import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Appbar() {

    //check if user already loggedin
    const session = useSession();
    return <div>
        <div className="flex justify-between">
            <div>
                jukebox
            </div>
            <div>
                {session.data?.user && <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => signOut()}>Logout</Button>}
                {!session.data?.user && <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => signIn()}>Signin</Button>}
            </div>
        </div>
    </div>
}