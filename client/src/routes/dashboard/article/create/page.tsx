import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formArticleSchema } from "@/types/chema.type";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeaderAction from "@/components/dashboard/header-action";
import { getAllCategory } from "@/actions/category.api";
import { CategoryResponse } from "@/types/category.type";
import { toast } from "sonner";
import { createArticle } from "@/actions/article.api";
import { ArticleRequest } from "@/types/article.type";
import { AxiosError } from "axios";
import ContentArticle from "@/components/article/content";

function DashboardCreateArticlePage() {
  const breadcrumbs = [
    { label: "Pages", link: "/" },
    { label: "Article", link: "/dashboard/articles" },
    { label: "Create" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(true);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategory();
      setCategories(categories);
    };

    getCategories();
  }, []);

  const onChange = (data: string) => {
    setContent(data);
  };

  const form = useForm({
    resolver: zodResolver(formArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      thumbnail: undefined,
      categoryId: "",
    },
  });

  const fileRef = form.register("thumbnail");

  const onSubmit = async (values: z.infer<typeof formArticleSchema>) => {
    try {
      setIsLoading(true);
      if (content.trim().length <= 0) {
        toast.error("Please finish your content!!!");
        return;
      }

      const body: ArticleRequest = {
        title: values.title,
        content: content,
        description: values.description,
        link: "",
        categoryId: values.categoryId,
      };
      const formData = new FormData();
      formData.append("thumbnail", values.thumbnail[0]);

      const { message } = await createArticle(body, formData);
      handleClose();

      toast.success(message);
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
      <SidebarProvider
        open={open}
        onOpenChange={setOpen}
        className="flex-row-reverse"
        style={
          {
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem",
          } as React.CSSProperties & { [key: string]: any }
        }
      >
        <Sidebar side="right" variant="floating">
          <SidebarContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <SidebarGroup>
                  <SidebarGroupLabel>Title</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="title articles...."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Description</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="description articles...."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Category</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <FormField
                          control={form.control}
                          name="categoryId"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((item, index) => (
                                    <SelectItem
                                      key={item.id || index}
                                      value={item.id!}
                                    >
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Description</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <FormField
                          control={form.control}
                          name="thumbnail"
                          render={() => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...fileRef}
                                  type="file"
                                  placeholder="thumbnail articles...."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <Button className="w-full" disabled={isLoading}>
                  Create
                </Button>
              </form>
            </Form>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <main className="w-full h-full">
            <div className="h-full flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="w-full flex items-start justify-between">
                <div className="">
                  <h3>Create Article</h3>
                  <span>Check the sales, value and bounce rate by country</span>
                </div>
                <Button variant={"outline"} onClick={() => setOpen(!open)}>
                  {open ? <PanelLeftOpen /> : <PanelLeftClose />}
                </Button>
              </div>
              <div className="flex flex-1 flex-col gap-4 px-4 py-4">
                <ContentArticle
                  onChange={onChange}
                  initialContent={undefined}
                />
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default DashboardCreateArticlePage;
