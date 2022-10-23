import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  title: string;
};

export const FormWrapper: React.FC<Props> = ({ children, linkText, linkHref, title }) => {
  const router = useRouter();

  return (
    <div className="bg-zinc-800 w-screen h-screen">
      <div className="w-full h-full min-h-full flex justify-center items-center">
        <div className="w-9/12 max-w-md bg-black text-white p-8 rounded">
          <h2 className="font-bold text-3xl text-center mb-7">{title}</h2>
          {children}
          {linkText && linkHref && (
            <Link href={{ pathname: linkHref, query: { ...router.query } }} passHref>
              <a className="mt-4 block text-blue-500 hover:underline">{linkText}</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
