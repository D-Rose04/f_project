import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Adopt from "./pages/Adopt/Adopt";
import Social from "./pages/Social/Social";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

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
                path: "/social",
                element: <Social />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ],
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