import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Send from "./pages/Send";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />, 
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "signin",
      element: <SignIn />,
    },
    {
      path: "send",
      element: <Send />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
