import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LayoutPage from "@/routes/layout";
import Homepage from "@/routes/homepage/page";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
