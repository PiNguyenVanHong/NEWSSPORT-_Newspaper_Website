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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modals/modal";

const ResendMailModal = () => {
  const [isPending, setIsPending] = useState(false);
  const { isOpen, onClose, type, data: { query, redirectAction } } = useModal();
  const isModalOpen = isOpen && type === "resend-mail";

  const form = useForm({
    resolver: zodResolver(formResendMailSchema),
    defaultValues: {
      email: query?.email ?? "",
    },
  });

  useEffect(() => {
    if (isModalOpen && query?.email) {
      form.reset({ email: query.email });
    }
  }, [isModalOpen, query?.email]);

  const onSubmit = async (values: z.infer<typeof formResendMailSchema>) => {
        try {
          setIsPending(true);

          const { email } = values;
          await resendMail(email);
          if (redirectAction) {
            redirectAction();
          }

          handleClose();
          toast.success("Please check your email again!!!");
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong!!!");
        } finally {
          setIsPending(false);
        }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Verify your email address"
      description="Please verify your email before we sent a confirmation email for you."
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Email"
                              disabled
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
                    ) : (<span>Submit</span>)}
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

export default ResendMailModal;
