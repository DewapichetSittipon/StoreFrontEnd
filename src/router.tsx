import { createBrowserRouter } from "react-router-dom";
import { Login, NotFound } from "./pages/Others";
import PageBase from "./pages/PageBase";

export const router = createBrowserRouter([
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/',
    element: <PageBase />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);