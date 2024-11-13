import { CircleXIcon, PanelLeftClose, PanelLeftOpen, Trash, Trash2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUpdateArticleSchema } from "@/types/chema.type";
import { CategoryResponse } from "@/types/category.type";
import { ArticleRequest } from "@/types/article.type";
import { ArticleResponse } from "@/types/article.type";
import { formatUrlImage } from "@/lib/format";
import { createArticle } from "@/actions/article.api";

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
import ContentArticle from "@/components/article/content";
import { statuses } from "../_components/data";
import { AuthContext } from "@/context/auth-context";

function DashboardUpdateArticlePage() {
  const {
    article,
    categories,
  }: { article: ArticleResponse; categories: CategoryResponse[] } =
    useLoaderData() as any;
  const { userId } = useContext(AuthContext) as any;

  const breadcrumbs = [
    { label: "Pages", link: "/" },
    { label: "Article", link: "/dashboard/articles" },
    { label: article.title },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(true);
  const [content, setContent] = useState(article.content!);
  const editable = userId === article.user?.id;

  const form = useForm({
    resolver: zodResolver(formUpdateArticleSchema),
    defaultValues: {
      title: article.title!,
      description: article.description!,
      content: article.content!,
      oldThumbnail: article.thumbnail!,
      thumbnail: undefined,
      categoryId: article.category?.id!,
      status: article.status!,
    },
  });

  const fileRef = form.register("thumbnail");

  const onChange = (data: string) => {
    setContent(data);
  };

  const onSubmit = async (values: z.infer<typeof formUpdateArticleSchema>) => {
    try {
      setIsLoading(true);
      if (content.trim().length <= 0) {
        toast.error("Please finish your content!!!");
        return;
      }

      //   const body: ArticleRequest = {
      //     title: values.title,
      //     content: content,
      //     description: values.description,
      //     link: "",
      //     categoryId: values.categoryId,
      //   };
      //   const formData = new FormData();
      //   formData.append("thumbnail", values.thumbnail[0]);

      //   const { message } = await createArticle(body, formData);
      //   handleClose();

      //   toast.success(message);
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
                                  disabled={!editable}
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
                                  disabled={!editable}
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
                                disabled={!editable}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white capitalize">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((item, index) => (
                                    <SelectItem
                                      key={item.id || index}
                                      className="capitalize"
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
                  <SidebarGroupLabel>Thumbnail</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        {/* {form.getValues("thumbnail") ? ( */}
                        <div className="w-full h-48 relative group">
                          <img
                            className="absolute inset-0 z-[1] w-full h-full"
                            src={formatUrlImage(form.getValues("oldThumbnail"))}
                            alt=""
                          />
                          <div className="absolute inset-0 z-[3] w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <button className="rounded-full p-2 bg-red-500 hover:opacity-80 transition-opacity">
                              <Trash2 className="text-white" size={16} />
                            </button>
                          </div>
                        </div>
                        {/* ): ( */}
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
                        {/* )} */}
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <Button className="w-full" disabled={isLoading}>
                  Update
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
                </div>
                <Button variant={"outline"} onClick={() => setOpen(!open)}>
                  {open ? <PanelLeftOpen /> : <PanelLeftClose />}
                </Button>
              </div>
              <div className="flex flex-1 flex-col gap-4 px-4 py-4">
                <ContentArticle
                  onChange={onChange}
                  initialContent={content}
                  className="bg-white"
                  editable={editable}
                />
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default DashboardUpdateArticlePage;
