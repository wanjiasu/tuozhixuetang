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
        "flex items-center justify-between h-20 sm:h-24",
        className,
      )}
    >
      <Logo />
      <div className="hidden md:flex items-center gap-6 ml-8">
        <Link
          className="text-primary hover:text-primary-600 font-medium transition-colors"
          href="/tools"
        >
          Tools
        </Link>
        <Link
          className="text-primary hover:text-primary-600 font-medium transition-colors"
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className="text-primary hover:text-primary-600 font-medium transition-colors"
          href="/glossary"
        >
          Glossary
        </Link>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href={"https://github.com/someu/aigotools"} target="_blank">
          <Github className="text-primary cursor-pointer" size={16} />
        </Link>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Link href={"/submit"}>
          <Button className="font-semibold" color="primary" size="sm">
            {t("submit")}
          </Button>
        </Link>
      </div>
    </Container>
  );
}
