import clsx from "clsx";
import React from "react";
import { useTranslations } from "next-intl";
import { Divider } from "@nextui-org/react";
import { Github } from "lucide-react";

import { AppConfig } from "@/lib/config";
import { Link } from "@/navigation";

import Container from "./container";
import Logo from "./logo";

export default function Footer({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <Container className={clsx(className, "pb-12")}>
      <Divider className="mt-16 sm:mt-28 mb-6 bg-white/20" />
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 flex flex-col">
          <Logo className="text-[28px] mb-4 gradient-text" />
          <div className="font-normal text-white/80 text-tiny sm:text-sm mb-2">
            {t("slogan")}.
          </div>

          <div className="font-normal flex items-center gap-2 text-white/70 text-tiny sm:text-sm">
            @2024 {AppConfig.siteName}.All rights reserved.
          </div>
          <div className="mt-2">
            <Link href={"https://github.com/someu/aigotools"} target="_blank">
              <Github className="text-white/80 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" size={16} />
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-start sm:justify-end mt-6 sm:mt-0 font-semibold text-white/90 text-sm sm:text-base">
          <div className="flex-grow-0 flex-shrink-0 basis-40 flex flex-col gap-2 text-left sm:text-right">
            <Link href={"/"} target="_blank" className="hover:text-white transition-colors duration-300 neon-glow">
              {AppConfig.siteName}
            </Link>
            <Link href={"/#featured"} className="hover:text-white transition-colors duration-300 neon-glow">{t("featured")}</Link>
            <Link href={"/#latest"} className="hover:text-white transition-colors duration-300 neon-glow">{t("latestSubmit")}</Link>
            <Link href={"/submit"} className="hover:text-white transition-colors duration-300 neon-glow">{t("submitATool")}</Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
