import { createBrowserRouter } from "react-router-dom";
import { Login, NotFound } from "./pages/Others";
import PageBase from "./pages/PageBase";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <PageBase />,
      },
      {
        path: '/signin',
        element: <Login />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);