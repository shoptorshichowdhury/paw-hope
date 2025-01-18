import Dashboard from "@/Layouts/Dashboard";
import Main from "@/Layouts/Main";
import AddPet from "@/Pages/AddPet/AddPet";
import DonationCampaigns from "@/Pages/DonationCampaigns/DonationCampaigns";
import DonationDetails from "@/Pages/DonationDetails/DonationDetails";
import Home from "@/Pages/Home/Home/Home";
import Login from "@/Pages/Login/Login";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import PetListing from "@/Pages/PetListing/PetListing";
import Register from "@/Pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MyAddedPets from "@/Pages/MyAddedPets/MyAddedPets";

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
        path: "/petDetails/:id",
        element: <PetDetails />,
      },
      {
        path: "/donationDetails",
        element: <DonationDetails />,
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
  //   dashboard routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // user routes
      {
        index: true,
        element: (
          <PrivateRoute>
            <AddPet />
          </PrivateRoute>
        ),
      },
      {
        path: "myAddedPets",
        element: (
          <PrivateRoute>
            <MyAddedPets />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
