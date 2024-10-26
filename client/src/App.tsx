import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { articleDetailPageLoader } from "@/lib/loader";

import LayoutPage from "@/routes/layout";
import Homepage from "@/routes/homepage/page";
import CategoryNewsPage from "@/routes/category/page";
import ArticleDetailPage from "@/routes/article-detail/page";
import ContactUsPage from "@/routes/contact-us/page";
import NotFoundPage from "@/routes/not-found/page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutPage />,
      children: [
        {
          path: "/",
          element:  <Homepage />
        },
        {
          path: "/the-thao",
          element: <CategoryNewsPage />
        },
        {
          path: "/sports",
          element: <CategoryNewsPage />
        },
        {
          path: "/:alias",
          element: <ArticleDetailPage />,
          loader: articleDetailPageLoader,
        },
        {
          path: "/contact-us",
          element: <ContactUsPage />,
        },
        {
          path: "/404",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;