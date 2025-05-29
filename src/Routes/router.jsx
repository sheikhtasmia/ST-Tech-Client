import {
    createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout></Mainlayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path:'/login',
                element:<Login></Login>
            },

            {
                path:'/registration',
                element:<Registration></Registration>
            },
        ],
    },
]);

export default router;