"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const UserAuthentication = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // console.log({pathname, searchParams: searchParams.toString()})

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, [session?.user])


  return <>{children}</>;
};

export default UserAuthentication;
