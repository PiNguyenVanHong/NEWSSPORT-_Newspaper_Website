import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
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
import {
  checkResendMail,
  resendMail,
  verifyRegister,
} from "@/actions/auth.api";
import { formatTimeCountDown, maskEmail } from "@/lib/format";
import { RefreshCcw } from "lucide-react";

function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;

  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/sign-in");
      return;
    }

    const checkExpiredCode = async () => {
      const { result }: { result: number } = await checkResendMail(email);

      setRemainingTime(result);
    };

    checkExpiredCode();

    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const form = useForm<z.infer<typeof formVerifySchema>>({
    resolver: zodResolver(formVerifySchema),
    defaultValues: {
      email: email,
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formVerifySchema>) {
    if (remainingTime && remainingTime > 0) {
    }

    const { email, code } = values;
    try {
      const { message } = await verifyRegister(email, code);

      toast.success(message);
      navigate("/sign-in");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message.includes("expried")) {
          toast.error("Your code expried!!! Please resend your mail");
        } else {
          toast.error(error?.response?.data?.message);
        }
      } else console.log(error);
    }
  }

  const handleResendMail = () => {
    if (remainingTime !== 0) return;
    
    setIsPending(true);
    toast.promise(resendMail(email), {
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
      finally: () => {
        setIsPending(false);
        window.location.reload();
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 px-20">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">Enter the code</h1>
        <div className="text-foreground-gray">
          Enter the ETP code that we sent to your email {maskEmail(email!)}.
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
                {isPending ? (
                  <>
                    <RefreshCcw className="animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Verify Email</span>
                )}
              </Button>
              <div className="w-full mt-4 flex items-center justify-center gap-0">
                <Button
                  variant={"link"}
                  onClick={handleResendMail}
                  disabled={remainingTime !== 0}
                >
                  Resend email after
                </Button>
                <div className="text-blue-500">
                  {remainingTime !== null
                    ? formatTimeCountDown(remainingTime)
                    : "00:00"}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default VerifyPage;
