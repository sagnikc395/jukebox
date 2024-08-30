'use client';
import { signIn, useSession } from "next-auth/react"
import { signOut } from "next-auth/react";

export function Appbar() {

    //check if user already loggedin
    const session = useSession();
    return <div>
        <div className="flex justify-between">
            <div>
                jukebox
            </div>
            <div>
                {/** user will get redirected to the login page  */}
                {session.data?.user &&
                    <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>Logout</button>}
                <button className="m-2 p-2 bg-blue-600" onClick={() => signIn()}>
                    SignIn
                </button>
            </div>
        </div>
    </div>
}