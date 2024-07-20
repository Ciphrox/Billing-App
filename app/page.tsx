/* eslint-disable import/order */

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default async function Home() {
  return (
    <section className="flex flex-col h-full items-center justify-center gap-4 py-8 md:py-10">
      {/* <div className="size-52 absolute rounded-full bg-opacity-25 bg-blue-200 blur-lg "></div> */}

      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white"> */}
      {/* <div className="max-w-3xl text-center px-4">
        <div className="rounded-xl flex flex-col py-6 items-center justify-center bg-gradient-to-r bg-gradient-to-r from-zinc-500 to-slate-700 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Your Inventory Manager
          </h1>
          <p className="text-2xl mb-8">
            Organize your inventory and manage bills effortlessly
          </p>
          <div className="flex flex-wrap justify-center gap-8">
          </div>
        </div>
      </div> */}
      {/* <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div> */}

      {/* <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div> */}

      {/* <div className="mt-8">
        <Snippet >
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet> */}
      {/* </div> */}
    </section>
  );
}
