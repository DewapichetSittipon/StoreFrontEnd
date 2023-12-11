import { createBrowserRouter } from "react-router-dom";
import { Login, NotFound } from "./pages/Others";
import { Store, User } from "./pages/Admin";
import PageBase from "./pages/PageBase";
import App from "./App";

const other = [
  {
    path: '/signin',
    element: <Login />,
  },
];

const admin = [
  {
    path: '/admin/store',
    element: <Store />
  },
  {
    path: '/admin/user',
    element: <User />
  }
];

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <PageBase />,
        children: [
          ...admin,
        ]
      },
      ...other,
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);