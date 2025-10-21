import clsx from "clsx";
import React from "react";
import { Istok_Web } from "next/font/google";

import { AppConfig } from "@/lib/config";
import { Link } from "@/navigation";

const istokWeb = Istok_Web({
  subsets: ["latin"],
  weight: "700",
});

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"}>
      <h1
        className={clsx(
          "text-white font-bold text-2xl sm:text-4xl leading-none gradient-text neon-glow",
          className,
          istokWeb.className,
        )}
      >
        {AppConfig.siteName}
      </h1>
    </Link>
  );
}
