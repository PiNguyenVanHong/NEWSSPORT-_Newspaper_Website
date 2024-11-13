import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  articleDashboardPageLoader,
  categoryDashboardPageLoader,
  favoritesPageLoader,
  homepageLoader,
  ownArticleDashboardPageLoader,
  searchPageLoader,
  topHeadingDashboardPageLoader,
  updateArticleDashboardPageLoader,
  wrapperPageLoader,
} from "@/lib/loader";

import Homepage from "@/routes/homepage/page";
import ContactUsPage from "@/routes/contact-us/page";
import NotFoundPage from "@/routes/not-found/page";
import SignInPage from "@/routes/sign-in/page";
import SignUpPage from "@/routes/sign-up/page";
import VerifyPage from "@/routes/verify/page";
import DashboardPage from "@/routes/dashboard/page";
import TestTablePage from "@/routes/test-table/page";
import WrapperPage from "@/routes/wrapper-page/page";
import FavoritesPage from "@/routes/favorites/page";
import SearchPage from "@/routes/search/page";
import DashboardCategoryPage from "@/routes/dashboard/category/page";
import DashboardCreateCategoryPage from "@/routes/dashboard/category/create/page";
import DashboardArticlePage from "@/routes/dashboard/article/page";
import DashboardCreateArticlePage from "@/routes/dashboard/article/create/page";
import DashboardUpdateArticlePage from "@/routes/dashboard/article/update/page";
import DashboardOwnArticlePage from "@/routes/dashboard/own-article/page";
import DashboardTopHeadingPage from "@/routes/dashboard/top-heading/page";

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
          loader: homepageLoader,
        },
        {
          path: "/:alias",
          element: <WrapperPage />,
          loader: wrapperPageLoader,
        },
        {
          path: "/favorites",
          element: <FavoritesPage />,
          loader: favoritesPageLoader,
        },
        {
          path: "/contact-us",
          element: <ContactUsPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
          loader: searchPageLoader,
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
          path: "/dashboard/top-heading",
          element: <DashboardTopHeadingPage />,
          loader: topHeadingDashboardPageLoader,
        },
        {
          path: "/dashboard/categories",
          element: <DashboardCategoryPage />,
          loader: categoryDashboardPageLoader,
        },
        {
          path: "/dashboard/categories/create",
          element: <DashboardCreateCategoryPage />,
        },
        {
          path: "/dashboard/articles",
          element: <DashboardArticlePage />,
          loader: articleDashboardPageLoader,
        },
        {
          path: "/dashboard/articles/:id",
          element: <DashboardUpdateArticlePage />,
          loader: updateArticleDashboardPageLoader,
        },
        {
          path: "/dashboard/articles/create",
          element: <DashboardCreateArticlePage />,
        },
        {
          path: "/dashboard/own-articles",
          element: <DashboardOwnArticlePage />,
          loader: ownArticleDashboardPageLoader,
        },
        {
          path: "/dashboard/own-articles/create",
          element: <DashboardCreateArticlePage />,
        },
        {
          path: "/dashboard/own-articles/update",
          element: <DashboardUpdateArticlePage />,
          loader: updateArticleDashboardPageLoader,
        },
        {
          path: "/dashboard/test-table",
          element: <TestTablePage />,
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
          element: <VerifyPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
