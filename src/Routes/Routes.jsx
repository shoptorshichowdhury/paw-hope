import Main from "@/Layouts/Main";
import Home from "@/Pages/Home/Home/Home";
import PetListing from "@/Pages/PetListing/PetListing";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/petListing",
        element: <PetListing />,
      },
    ],
  },
]);
