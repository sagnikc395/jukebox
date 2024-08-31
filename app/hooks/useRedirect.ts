/* eslint-disable react-hooks/exhaustive-deps */
//our own hook to redirect when authenticatd.

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useRedirect() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      //if authenticated then add to dashboard
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [session]);
}
