import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { articleDetailPageLoader, categoryDashboardPageLoader } from "@/lib/loader";

import Homepage from "@/routes/homepage/page";
import CategoryNewsPage from "@/routes/category/page";
import ArticleDetailPage from "@/routes/article-detail/page";
import ContactUsPage from "@/routes/contact-us/page";
import NotFoundPage from "@/routes/not-found/page";
import SignInPage from "@/routes/sign-in/page";
import SignUpPage from "@/routes/sign-up/page";
import VerifyPage from "@/routes/verify/page";
import DashboardPage from "@/routes/dashboard/page";
import TestTablePage from "@/routes/test-table/page";
import DashboardCategoryPage from "@/routes/dashboard/category/page";
import DashboardArticlePage from "@/routes/dashboard/article/page";
import DashboardCreateArticlePage from "@/routes/dashboard/article/create/page";
import DashboardCreateCategoryPage from "@/routes/dashboard/category/create/page";

import LayoutPage from "@/components/layout/layout";
import AuthLayoutPage from "@/components/layout/auth-layout";
import DashboardLayoutPage from "@/components/layout/dashboard-layout";

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
      path: "/dashboard",
      element: <DashboardLayoutPage />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/dashboard/categories",
          element: <DashboardCategoryPage />,
          loader: categoryDashboardPageLoader,
        },
        {
          path: "/dashboard/categories/create",
          element: <DashboardCreateCategoryPage  />
        },
        {
          path: "/dashboard/articles",
          element: <DashboardArticlePage  />
        },
        {
          path: "/dashboard/articles/create",
          element: <DashboardCreateArticlePage  />
        },
        {
          path: "/dashboard/test-table",
          element: <TestTablePage  />
        },
      ]
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
