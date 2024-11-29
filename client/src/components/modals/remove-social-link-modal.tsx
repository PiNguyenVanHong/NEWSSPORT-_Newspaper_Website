import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { removeSocialLink } from "@/actions/social-link.api";

const RemoveSocialLinkModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { query },
  } = useModal();
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && type === "remove-social-link";

  const onConfirm = async () => {
    if (!query || !query.id) return;

    try {
      setLoading(true);

      const { message } = await removeSocialLink(query.id);

      toast.success(message);
      onClose();
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError)
        return toast.error(error?.response?.data?.message);
      else {
        console.log(error);
        toast.error("Something went wrong!!!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveSocialLinkModal;
