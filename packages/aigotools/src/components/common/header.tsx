"use client";
import { useTranslations, useLocale } from "next-intl";
import { Github } from "lucide-react";
import clsx from "clsx";
import { Avatar, Button } from "@nextui-org/react";

import { Link } from "@/navigation";

import Container from "./container";
import Logo from "./logo";
import { ThemeSwitcher } from "./theme-switcher";
import LanguageSwitcher from "./language-switcher";

export default function Header({ className }: { className?: string }) {
  const t = useTranslations("header");

  const locale = useLocale();

  const forceRedirectUrl =
    typeof window === "undefined"
      ? null
      : `${window.location.origin}/${locale}/submit`;

  return (
    <Container
      className={clsx(
        "flex items-center justify-between h-20 sm:h-24 modern-card backdrop-blur-md bg-opacity-10 border-b border-white/10",
        className,
      )}
    >
      <Logo />
      <div className="hidden md:flex items-center gap-6 ml-8">
        <Link
          className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 neon-glow"
          href="/tools"
        >
          Tools
        </Link>
        <Link
          className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 neon-glow"
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 neon-glow"
          href="/glossary"
        >
          Glossary
        </Link>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href={"https://github.com/someu/aigotools"} target="_blank">
          <Github className="text-white/80 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" size={16} />
        </Link>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Link href={"/submit"}>
          <Button 
            className="font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
            size="sm"
          >
            {t("submit")}
          </Button>
        </Link>
      </div>
    </Container>
  );
}
