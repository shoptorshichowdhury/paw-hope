import Main from "@/Layouts/Main";
import DonationCampaigns from "@/Pages/DonationCampaigns/DonationCampaigns";
import Home from "@/Pages/Home/Home/Home";
import Login from "@/Pages/Login/Login";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import PetListing from "@/Pages/PetListing/PetListing";
import Register from "@/Pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <p>Error holo toh.....</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/petListing",
        element: <PetListing />,
      },
      {
        path: "/petDetails",
        element: <PetDetails />,
      },
      {
        path: "/donationCampaigns",
        element: <DonationCampaigns />,
      },
    ],
  },
  //   authentication routes
  {
    path: "/authentication",
    children: [
      {
        path: "/authentication/login",
        element: <Login></Login>,
      },
      {
        path: "/authentication/register",
        element: <Register></Register>,
      },
    ],
  },
]);
