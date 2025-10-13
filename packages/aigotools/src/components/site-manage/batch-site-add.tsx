"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";

import { batchCreateSites } from "@/lib/actions";

interface BatchSiteAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BatchSiteAdd({ isOpen, onClose, onSuccess }: BatchSiteAddProps) {
  const t = useTranslations("siteManage");
  const [urls, setUrls] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!urls.trim()) {
      toast.error(t("requireUrls"));
      return;
    }

    const urlList = urls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (urlList.length === 0) {
      toast.error(t("requireUrls"));
      return;
    }

    // 验证URL格式
    const invalidUrls = urlList.filter((url) => {
      try {
        new URL(url);
        return false;
      } catch {
        return true;
      }
    });

    if (invalidUrls.length > 0) {
      toast.error(t("invalidUrls"));
      return;
    }

    setIsLoading(true);
    try {
      const result = await batchCreateSites(urlList);
      
      if (result.created > 0) {
        toast.success(t("batchCreateSuccess"));
      }
      
      if (result.failed > 0) {
        toast.warning(t("batchCreatePartialFail"));
      }

      setUrls("");
      onSuccess();
    } catch (error) {
      console.error("Batch create sites error:", error);
      toast.error(t("batchCreateFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUrls("");
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("batchAddTitle")}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("batchAddDescription")}
                </p>
                <Textarea
                  label={t("websiteUrls")}
                  placeholder={t("batchAddPlaceholder")}
                  value={urls}
                  onValueChange={setUrls}
                  minRows={8}
                  maxRows={15}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {t("batchAddHint")}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                {t("cancel")}
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                isLoading={isLoading}
                isDisabled={!urls.trim()}
              >
                {t("batchCreate")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}