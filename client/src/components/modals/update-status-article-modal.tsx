import { toast } from "sonner";
import { AxiosError } from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { updateStatusArticleById } from "@/actions/article.api";

import { Modal } from "@/components/modals/modal";
import { Button } from "@/components/ui/button";

export const UpdateStatusArticleModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "update-status-article";

  const onConfirm = () => {
    const { query } = data;
    if (!query?.articleId || !query?.status) {
      return;
    }

    toast.promise(updateStatusArticleById(query.articleId, query.status), {
      loading: "Loading...",
      success: ({ message }: { message: string }) => {
        return message;
      },
      error: (error) => {
        if (error instanceof AxiosError) return error?.response?.data?.message;
        else {
          console.log(error);
          return "Something went wrong!!!";
        }
      },
    });
    onClose();
  };

  return (
    <Modal
      title="Do you want change status of this article?"
      description="This action can be undone."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"default"} onClick={onConfirm}>
          Continute
        </Button>
      </div>
    </Modal>
  );
};
