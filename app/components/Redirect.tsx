/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Redirect() {
    //if user logged in , then redirect them to the dashboard 

    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.data?.user) {
            router.push("/dashboard");
        }
    }, [session]);

    return null;
}