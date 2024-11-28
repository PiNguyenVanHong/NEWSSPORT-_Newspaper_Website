import * as z from "zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/context/auth-context";
import { login } from "@/actions/auth.api";
import { formLoginSchema } from "@/types/chema.type";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { useModal } from "@/hooks/use-modal-store";

function SignInPage() {
  const { updateToken }: any = useContext(AuthContext);
  const { onOpen } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    try {
      const { email, password } = values;
  
      const { accessToken } = await login(email, password);
  
      await updateToken(accessToken);
      handleClose();
  
      toast.success("Login Successfully.");
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.response?.data.message.includes("is not activated")) {
          onOpen("resend-mail", { query: { email: values.email }, redirectAction: () => navigate("/verify", { state: { email: values.email } }) });
        }
        toast.error(error?.response?.data?.message);
      }
      else {
        console.log(error);
        toast.error("Something went wrong!!!");
      }
    }
  };

  const handleClose = () => {
    form.reset();
    navigate("/");
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 px-20">
      <h1 className="text-4xl font-semibold">Welcome back!</h1>
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
                      <Input className="bg-white" {...field} type="email" placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pr-10 bg-white"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5 py-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none tracking-wide">
                    <FormLabel>
                      I have read and accepted the
                      <span className="underline"> General Terms</span>
                      and
                      <span className="underline"> Conditions </span>
                      of this website.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button className="w-full">Login</Button>
          </div>
        </form>
      </Form>
      <div className="w-full flex items-center text-lg">
        <div className="bg-foreground-gray h-0.5 flex-1 rounded-full" />
        <span className="px-4">or</span>
        <div className="bg-foreground-gray h-0.5 flex-1 rounded-full" />
      </div>
      <p className="text-center text-sm">
        Have an account yet?{" "}
        <Link to={"/sign-up"} className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
      <div className="w-full flex flex-col gap-2 items-center">
        <Button variant="outline" className="w-full py-5">
          <div className="w-56 flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
              style={{
                width: "22px",
                height: "22px",
              }}
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Continute with Google</span>
          </div>
        </Button>
        <Button variant="outline" className="w-full py-5">
          <div className="w-56 flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 30 30"
              style={{
                width: "22px",
                height: "22px",
              }}
            >
              <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"></path>
            </svg>
            <span>Continute with Apple</span>
          </div>
        </Button>
        <Button variant="outline" className="w-full py-5">
          <div className="w-56 flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
              style={{
                width: "22px",
                height: "22px",
              }}
            >
              <path
                fill="#039be5"
                d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
              ></path>
              <path
                fill="#fff"
                d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
              ></path>
            </svg>
            <span>Continute with Facebook</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default SignInPage;
