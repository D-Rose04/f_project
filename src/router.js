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
                    },
                ],
            },
            {
                path: "/lost-pets",
                element: <LostPets />,
                children: [
                    {
                        path: "add-pet",
                        element: <AddLostPet />
                    },
                ]
            },
            {
                path: "/social",
                element: <Social />
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