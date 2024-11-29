import BackgroundImage from "@/assets/user/background-default.jpg";
import UserImage from "@/assets/user.jpg";

import {
  CircleUserRound,
  Dribbble,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Medal,
  Phone,
  Smile,
  Twitter,
  Youtube,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserResponse } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import HeaderAction from "@/components/dashboard/header-action";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { setDescription, setTitle } from "@/lib/utils";
import { updateUserProfile } from "@/actions/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/hooks/use-modal-store";
import { SocialLinkResponse } from "@/types/social-link.type";

const formUserProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  bio: z.string(),
  isTwoFactorEnabled: z.boolean().default(false),
});

function DashboardEditUserProfilePage() {
  const breadcrumbs = [
    { label: "Pages", link: "/dashboard" },
    { label: "User Profile Page" },
  ];
  const navigate = useNavigate();
  const {
    userInfo,
    socialLinks,
  }: { userInfo: UserResponse; socialLinks: SocialLinkResponse[] } =
    useLoaderData() as any;
  const [isPending, setIsPending] = useState(false);
  const [socials, setSocials] = useState([
    {
      id: "1",
      label: "Facebook account",
      Icon: <Facebook strokeWidth={0} fill="#3F51B5" />,
      value: "",
    },
    {
      id: "2",
      label: "Twitter account",
      Icon: <Twitter strokeWidth={0} fill="#039BE5" />,
      value: "",
    },
    {
      id: "3",
      label: "Instagram account",
      Icon: <Instagram className="text-[#C32AA3]" />,
      value: "",
    },
    {
      id: "4",
      label: "Dribbble account",
      Icon: <Dribbble className="text-[#EA4C89]" />,
      value: "",
    },
    {
      id: "5",
      label: "LinkedIn account",
      Icon: <Linkedin strokeWidth={0} fill="#0A66C2" />,
      value: "",
    },
    {
      id: "6",
      label: "Youtube account",
      Icon: <Youtube className="text-[#FF0000]" strokeWidth={2} size={26} />,
      value: "",
    },
  ]);
  const { onOpen } = useModal();

  useEffect(() => {
    setTitle("User Profile - News Sport+");
    setDescription("This page to edit your profile");

    const updatedSocials = socials.map((social) => {
      const matchedLink = socialLinks.find((dbLink) =>
        social.label.toLowerCase().includes(dbLink.name.toLowerCase())
      );

      return {
        ...social,
        id: matchedLink ? matchedLink.id! : social.id,
        value: matchedLink ? matchedLink.link : "",
      };
    });

    setSocials(updatedSocials);
  }, []);

  const form = useForm({
    resolver: zodResolver(formUserProfileSchema),
    defaultValues: {
      firstName: userInfo.firstName ?? "",
      lastName: userInfo.lastName ?? "",
      email: userInfo.email ?? "",
      phone: userInfo.phone ?? "",
      bio: userInfo.bio ?? "",
      isTwoFactorEnabled: userInfo.isTwoFactorEnabled ?? false,
    },
  });

  const avatarRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (values: z.infer<typeof formUserProfileSchema>) => {
    try {
      setIsPending(true);
      new Promise((res) => setTimeout(res, 5000));
      const { email, firstName, lastName, bio, isTwoFactorEnabled, phone } =
        values;

      const { message } = await updateUserProfile({
        email,
        firstName,
        lastName,
        bio,
        isTwoFactorEnabled,
        phone,
      });

      handleClose();
      toast.success(message);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error?.response?.data?.message);
      else console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    form.reset();
    navigate("/dashboard");
  };

  const handleOpenTab = (url: string) => {
    if (url.trim().length <= 0) return;

    window.open(url, "_blank");
  };

  return (
    <div>
      <HeaderAction data={breadcrumbs} />
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4 w-full grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-40">
                  <img src={BackgroundImage} alt="" />
                </div>
                <div className="px-6 pb-6">
                  <div className="-mt-14 relative z-10">
                    <Avatar className="w-24 h-24 border-4 border-background rounded-3xl overflow-hidden">
                      <AvatarImage src={undefined} alt={userInfo.firstName} />
                      <AvatarFallback className="rounded-lg text-2xl">
                        PK
                      </AvatarFallback>
                    </Avatar>
                    {/* <div className="w-24 h-24 border-4 border-background rounded-3xl overflow-hidden">
                      <img src={UserImage} alt="" />
                    </div> */}
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <h4 className="text-lg font-semibold">Your Photo</h4>
                    <p className="text-gray-500">
                      This will be displayed on your
                    </p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant={"outline"}
                        onClick={() => avatarRef.current?.click()}
                        type="button"
                        disabled={isPending}
                      >
                        Upload New
                      </Button>
                      <Button type="submit" disabled={isPending}>
                        Save
                      </Button>
                      <input ref={avatarRef} type="file" className="hidden" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold">Personal Information</h4>

                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 gap-6 mb-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="peer ps-9"
                                {...field}
                                placeholder="abc..."
                                disabled={isPending}
                              />
                              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Smile
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="peer ps-9"
                                {...field}
                                placeholder="xyz..."
                                disabled={isPending}
                              />
                              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <CircleUserRound
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
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
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="peer ps-9"
                                {...field}
                                type="email"
                                placeholder="temp@example.com"
                                readOnly
                                disabled
                              />
                              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Mail
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="peer ps-9"
                                {...field}
                                placeholder="012 345 6789"
                                disabled={isPending}
                              />
                              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Phone
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Two Factor Authetication</FormLabel>
                            <FormDescription>
                              Receive code emails when you login.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <div>
                              <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
                                <Switch
                                  id="switch-14"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={isPending}
                                  className="peer absolute inset-0 h-[inherit] w-auto rounded-lg data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
                                />
                                <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
                                  <span className="text-[10px] font-medium uppercase">
                                    Off
                                  </span>
                                </span>
                                <span className="min-w-78flex pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
                                  <span className="text-[10px] font-medium uppercase">
                                    On
                                  </span>
                                </span>
                              </div>
                              <Label htmlFor="switch-14" className="sr-only">
                                Labeled switch
                              </Label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            {...field}
                            className="h-36 resize-none peer ps-9"
                            placeholder="Tell me something about you..."
                            disabled={isPending}
                          />
                          <div className="pointer-events-none absolute inset-y-0 top-2.5 start-0 ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <Medal
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold">Social Media accounts</h4>
                <div className="mt-4 flex flex-col gap-4">
                  {socials.map((item, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-between gap-4 border-b-2 border-neutral-200 pb-4"
                    >
                      <div className="flex items-center gap-4">
                        {item.Icon}
                        <div className="w-60">
                          <h4 className="font-semibold text-base">
                            {item.label}
                          </h4>
                          <span
                            onClick={() => handleOpenTab(item.value)}
                            className={`truncate max-w-xs font-medium ${
                              item.value
                                ? "text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
                                : "text-neutral-600"
                            }`}
                          >
                            {item.value || "Not connected"}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-32 py-6"
                        type="button"
                        variant={
                          item.value.trim().length > 0 ? "outline" : "default"
                        }
                        onClick={() => {
                          if (item.value.trim().length <= 0) {
                            onOpen("add-social-link", {
                              query: { name: item.label.split(" ")[0] },
                            });
                          } else {
                            onOpen("remove-social-link", {
                              query: { id: item.id },
                            });
                          }
                        }}
                      >
                        {item.value.trim().length > 0
                          ? "Disconnect"
                          : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default DashboardEditUserProfilePage;
