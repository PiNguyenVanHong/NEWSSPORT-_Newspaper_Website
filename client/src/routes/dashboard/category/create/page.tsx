import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeaderAction from "@/components/dashboard/header-action";
import { createCategory } from "@/actions/category.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  alias: z.string().min(2, {
    message: "Alias must be at least 2 characters.",
  }),
  level: z.coerce.number().min(0, {
    message: "Level must be at least 2 characters.",
  }),
});

function DashboardCreateCategoryPage() {
  const breadcrumbs = [
    { label: "Pages", link: "/dashboard" },
    { label: "Category", link: "/dashboard/categories" },
    { label: "Create" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      alias: "",
      level: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        setIsLoading(true);
      const { message } = await createCategory(values);

      toast.success(message);
      handleClose();
      navigate("/dashboard/categories");
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error?.response?.data?.message);
      else {
        console.log(error);
        toast.error("Something went wrong!!!");
      }
    } finally {
        setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
  };

  return (
    <div className="w-full min-h-screen">
      <HeaderAction data={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a create of your categoy for this month!
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-2xl w-full mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alias</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default DashboardCreateCategoryPage;
