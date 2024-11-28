import { useEffect, useState } from "react";
import { UpdateStatusArticleModal } from "@/components/modals/update-status-article-modal";
import UpdateTopHeadingArticleModal from "@/components/modals/update-top-heading-article-modal";
import ResendMailModal from "@/components/modals/resend-email-modal";
import LoginModal from "@/components/modals/login-modal";
import AddSocialLinkModal from "@/components/modals/add-social-link-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <UpdateStatusArticleModal />
      <UpdateTopHeadingArticleModal />
      <ResendMailModal />
      <AddSocialLinkModal />
    </>
  );
};
