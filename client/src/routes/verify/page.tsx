import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { formVerifySchema } from "@/types/chema.type";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyRegister } from "@/actions/auth.api";

function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/sign-in");
    }
  }, []);

  const form = useForm<z.infer<typeof formVerifySchema>>({
    resolver: zodResolver(formVerifySchema),
    defaultValues: {
      email: email,
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formVerifySchema>) {
    const { email, code } = values;
    try {
      const { message } = await verifyRegister(email, code);

      toast.success(message);
      navigate("/sign-in");
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error?.response?.data?.message);
      else console.log(error);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 px-20">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">Enter the code</h1>
        <div className="text-foreground-gray">
          Enter the ETP code that we sent to your email p******g@gmail.com.
          <br />
          Be careful not to share the code with anyone.
        </div>
      </div>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full min-h-96 flex flex-col justify-between items-center"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="w-full flex gap-4 items-center">
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            className="w-20 h-24 bg-white text-xl"
                            index={index}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full mt-20">
              <Button className="w-full" type="submit">
                Verify Email
              </Button>
              <Button className="w-full mt-4" variant={"link"}>
                Resend email after <span className="text-blue-500">05:00</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default VerifyPage;
