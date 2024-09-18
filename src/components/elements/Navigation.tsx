import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface NavigationProps {
  href: string;
  icon?: ReactNode;
  text: string;
  urlKeyword: string; // used to determine if the navigation is active
}

export default function Navigation({
  href,
  text,
  urlKeyword,
  ...props
}: NavigationProps) {
  const router = useRouter();

  return (
    <Link href={href} passHref className="flex flex-row">
      <div
        className={`${
          router.pathname === href || router.pathname.includes(urlKeyword)
            ? "bg-blue-500 font-bold"
            : "bg-white font-bold"
        } rounded-xl flex flex-row align-center self-stretch w-full py-2.5 px-4`}
      >
        <div
          className={`${
            router.pathname === href || router.pathname.includes(urlKeyword)
              ? "text-white font-bold"
              : "text-black font-bold"
          } text-base flex flex-row justify-center hover:underline`}
        >
          <div
            className={`mr-4 self-center ${
              router.pathname === href || router.pathname.includes(urlKeyword)
                ? "outline-white font-bold"
                : "outline-black font-bold"
            } `}
          >
            {props?.icon && props.icon}
          </div>
          <div>{text}</div>
        </div>
      </div>
    </Link>
  );
}
