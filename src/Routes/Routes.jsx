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
import CreateDonationCampaign from "@/Pages/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "@/Pages/MyDonationCampaigns/MyDonationCampaigns";
import MyDonations from "@/Pages/MyDonations/MyDonations";
import AdoptionRequest from "@/Pages/AdoptionRequest/AdoptionRequest";
import PetUpdate from "@/Pages/PetUpdate/PetUpdate";
import EditDonationCampaigns from "@/Pages/EditDonationCampaigns/EditDonationCampaigns";
import AdminRoute from "./AdminRoute";
import Users from "@/Pages/Users/Users";
import AllPets from "@/Pages/AllPets/AllPets";
import AllDonations from "@/Pages/AllDonations/AllDonations";

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
        path: "/donationCampaigns",
        element: <DonationCampaigns />,
      },
      {
        path: "/donationDetails/:id",
        element: <DonationDetails />,
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
        path: "petUpdate/:id",
        element: (
          <PrivateRoute>
            <PetUpdate />
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
      {
        path: "createDonationCampaign",
        element: (
          <PrivateRoute>
            <CreateDonationCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "myDonationCampaigns",
        element: (
          <PrivateRoute>
            <MyDonationCampaigns />
          </PrivateRoute>
        ),
      },
      {
        path: "editDonationCampaigns/:id",
        element: (
          <PrivateRoute>
            <EditDonationCampaigns />
          </PrivateRoute>
        ),
      },
      {
        path: "myDonations",
        element: (
          <PrivateRoute>
            <MyDonations />
          </PrivateRoute>
        ),
      },
      {
        path: "adoptionRequest",
        element: (
          <PrivateRoute>
            <AdoptionRequest />
          </PrivateRoute>
        ),
      },
      //   admin routes
      {
        path: "allUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Users />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allPets",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllPets />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allDonations",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllDonations />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
