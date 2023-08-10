import { createBrowserRouter } from "react-router-dom";
import Signin from "../page/Signin";
import Signup from "../page/Signup";
import Todo from "../page/Todo";
import Home from "../page/Home";
import HomeContents from "../component/HomeContents";

export const router = createBrowserRouter([
    {
      path: "",
      element: <Home />,
      children: [
        {
          index: true,
          element: <HomeContents />
        },
        {
          path: '/signin',
          element: <Signin />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path: '/todo',
          element: <Todo />,
        },
      ],
    },
  ]);