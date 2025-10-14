"use client";
import { Button } from "@nextui-org/react";
import { ThumbsUpIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";

import { Site } from "@/models/site";
import { isUserUpVoteSite, triggerUpvoteSite } from "@/lib/actions";

export default function VoteButton({ site }: { site: Site }) {
  const t = useTranslations("site");
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(site.voteCount);
  const [isLoading, setIsLoading] = useState(false);

  const triggerUpvote = async () => {
    try {
      toast.info(t("loginClosed"));
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const update = async () => {
      setVoteCount(site.voteCount);
      // 登录关闭，默认不显示已点赞状态
      setIsUpvoted(false);
    };

    update().finally(() => {
      setIsLoading(false);
    });
  }, [site]);

  const button = (
    <Button
      className={clsx("w-56 font-semibold", {
        "!text-primary-50": isUpvoted,
      })}
      color="success"
      isLoading={isLoading}
      radius="sm"
      variant={isUpvoted ? "solid" : "bordered"}
      onClick={triggerUpvote}
    >
      <ThumbsUpIcon size={14} strokeWidth={3} />
      {t("upvote")}
      {voteCount > 0 && <span>{voteCount}</span>}
    </Button>
  );

  return button;
}
