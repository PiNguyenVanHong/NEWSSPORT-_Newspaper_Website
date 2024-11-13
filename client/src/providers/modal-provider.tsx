import { useEffect, useState } from "react";
import { UpdateStatusArticleModal } from "@/components/modals/update-status-article-modal";
import LoginModal from "@/components/modals/login-modal";
import UpdateTopHeadingArticleModal from "@/components/modals/update-top-heading-article-modal";

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
    </>
  );
};
