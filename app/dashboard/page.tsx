'use client';

import { useSession } from "next-auth/react";

export default function Dashboard() {
    //dashboard only renders when logged in 
    const session = useSession();
    const redirect = useRedirect();

    try {
        if (!session.data?.user.id) {
            return (
                <h1> Please Log in to continue </h1 >
            )
        }
        return <StreamView creatorId={session.data.user.id} playVideo={true} />

    }
    catch (e) {
        return null;
    }
}

export const dynamic = 'auto';