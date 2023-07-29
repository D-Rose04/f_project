import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Adopt from "./pages/Adopt/Adopt";
import Social from "./pages/Social/Social";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Landing from "./pages/Landing/Landing";
import Chat from "./pages/Chat/Chat";
import MyPets from "./pages/MyPets/MyPets";
import AddPet from "./pages/MyPets/AddPet/AddPet";
import LostPets from "./pages/LostPets/LostPets";
import AddLostPet from "./pages/LostPets/AddLostPet/AddLostPet";
import LostPetDetails from "./pages/LostPets/LostPetDetails/LostPetDetails";
import LostPetFound from "./pages/LostPets/LostPetFound/LostPetFound";
import AddPost from "./pages/Social/CRUD/AddPost/AddPost";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Adopt />,
                children: [],
            },
            {
                path: "/my-pets",
                element: <MyPets />,
                children: [
                    {
                        path: "add-pet",
                        element: <AddPet />
                    }
                ],
            },
            {
                path: "/lost-pets",
                element: <LostPets />,
                children: [
                    {
                        path: "add-pet",
                        element: <AddLostPet />
                    }
                ]
            },
            {
                path: '/lost-pets/:petId',
                element: <LostPetDetails />,
                children: [
                    {
                        path:'found',
                        element: <LostPetFound />
                    }
                ]
            },
            {
                path: "/social",
                element: <Social />,
                children: [
                    {
                        path:  'add-post',
                        element: <AddPost/>
                    }
                ]
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/chat",
                element: <Chat />
            }
        ],
    },
    {
        path: "/landing",
        element: <Landing />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

export default router;