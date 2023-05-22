"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import imgTest from "@public/assets/images/logo.svg";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const setProv = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProv();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        {/* <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        /> */}
        <Image
          src={imgTest}
          alt="logo"
          width={30}
          height="auto"
          className="object-contain"
        />
        <p className="logo_text">Query GPT</p>
      </Link>

      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {status === "authenticated" ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-query" className="black_btn">
              Create Query
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {status === "authenticated" ? (
          <div className="flex">
            <Image
              src={session.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setToggleSidebar((prevState) => !prevState);
              }}
            />

            {toggleSidebar && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleSidebar(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-query"
                  className="dropdown_link"
                  onClick={() => setToggleSidebar(false)}
                >
                  Create Query
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleSidebar(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
