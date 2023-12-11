import { createBrowserRouter } from "react-router-dom";
import { Login, NotFound } from "./pages/Others";
import { Store, User } from "./pages/Admin";
import { UserStore } from "./pages/User";
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

const user = [
  {
    path: '/store',
    element: <UserStore />
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
          ...user,
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