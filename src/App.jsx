import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupLogin from "./pages/SignupLogin";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "",
    element: <SignupLogin />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "",
    element: <SignupLogin />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "",
    element: <Protected />,
    children: [
      {
        path: "/dashbord",
        element: <Dashboard />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
