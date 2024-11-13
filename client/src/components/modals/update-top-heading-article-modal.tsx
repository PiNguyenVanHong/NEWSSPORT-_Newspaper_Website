import { toast } from "sonner";
import { AxiosError } from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { updateTopHeadingArticle } from "@/actions/article.api";

import { Modal } from "@/components/modals/modal";
import { Button } from "@/components/ui/button";

const UpdateTopHeadingArticleModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "update-top-heading-article";
  
    const onConfirm = () => {
      const { query } = data;
      if (!query?.articleId || !query?.status) {
        return;
      }
  
      toast.promise(updateTopHeadingArticle(query.articleId, query.status), {
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
      title="Do you want push of this article on the top heading?"
      description="This action can be undone."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"default"} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
     );
}
 
export default UpdateTopHeadingArticleModal;