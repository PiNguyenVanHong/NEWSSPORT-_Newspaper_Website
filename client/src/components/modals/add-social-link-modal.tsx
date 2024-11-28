import { z } from "zod";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formResendMailSchema } from "@/types/chema.type";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { resendMail } from "@/actions/auth.api";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modals/modal";

const AddSocialLinkModal = () => {
  const [isPending, setIsPending] = useState(false);
  const {
    isOpen,
    onClose,
    type,
    data: { query },
  } = useModal();
  const isModalOpen = isOpen && type === "add-social-link";

  const form = useForm({
    resolver: zodResolver(formResendMailSchema),
    defaultValues: {
      email: "",
      name: query?.name ?? "",
    },
  });

  useEffect(() => {
    if (isModalOpen && query?.name) {
      form.reset({ name: query.name });
      
    }
    console.log(query?.name);
  }, [isModalOpen, query?.name]);

  const onSubmit = async (values: z.infer<typeof formResendMailSchema>) => {
    console.log(values);

    // try {
    //   setIsPending(true);

    //   const { email } = values;
    //   await resendMail(email);

    //   handleClose();
    //   window.location.reload();

    //   toast.success("Please check your email again!!!");
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Something went wrong!!!");
    // } finally {
    //   setIsPending(false);
    // }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Connect your social account"
      description="Please fill your real account to help audiences can share for your article."
    >
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="p-0">
          <div className="my-6 flex flex-col items-center justify-center">
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 gap-4 mb-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Name"
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="http://example.com.vn/your_account"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <RefreshCcw className="animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default AddSocialLinkModal;
