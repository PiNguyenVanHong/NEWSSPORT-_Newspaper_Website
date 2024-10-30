import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { articleDetailPageLoader } from "@/lib/loader";

import Homepage from "@/routes/homepage/page";
import CategoryNewsPage from "@/routes/category/page";
import ArticleDetailPage from "@/routes/article-detail/page";
import ContactUsPage from "@/routes/contact-us/page";
import NotFoundPage from "@/routes/not-found/page";
import SignInPage from "@/routes/sign-in/page";
import SignUpPage from "@/routes/sign-up/page";
import VerifyPage from "@/routes/verify/page";
import LayoutPage from "@/components/layout/layout";
import AuthLayoutPage from "@/components/layout/auth-layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutPage />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/the-thao",
          element: <CategoryNewsPage />,
        },
        {
          path: "/sports",
          element: <CategoryNewsPage />,
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
    {
      path: "/",
      element: <AuthLayoutPage />,
      children: [
        {
          path: "/sign-in",
          element: <SignInPage />,
        },
        {
          path: "/sign-up",
          element: <SignUpPage />,
        },
        {
          path: "/verify",
          element: <VerifyPage />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
