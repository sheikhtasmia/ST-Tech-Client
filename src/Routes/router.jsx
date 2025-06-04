import {
    createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import WebDevelopment from "../Pages/Services/WebDevelopment/WebDevelopment";
import DigitalMarketing from "../Pages/Services/DigitalMarketing/DigitalMarketing";
import SEO from "../Pages/Services/SEO/SEO";
import DataAnlysis from "../Pages/Services/DataAnlysis/DataAnlysis";
import GraphicsDesign from "../Pages/Services/GraphicsDesign/GraphicsDesign";
import ContentWriting from "../Pages/Services/ContentWriting/ContentWriting";
import HRRecruitment from "../Pages/Services/HRRecruitment/HRRecruitment";
import MSOfficeServices from "../Pages/Services/MSOfficeServices/MSOfficeServices";
import Contact from "../Pages/Contact/Contact";
import Dashboard from "../Layout/Dashboard/Dashboard";

import Work from "../Pages/DashboardPage/Work/Work";
import Profile from "../Pages/DashboardPage/Profile/Profile";
import UserHome from "../Pages/DashboardPage/UserHome/UserHome";

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
                path:'/services/web-development',
                element:<WebDevelopment></WebDevelopment>
            },

            {
                path:'/services/digital-marketing',
                element:<DigitalMarketing></DigitalMarketing>
            },


            {
                path:'/services/seo',
                element:<SEO></SEO>
            },

            {
                path:'/services/data-analysis',
                element:<DataAnlysis></DataAnlysis>
            },

            {
                path:'/services/GraphicsDesign',
                element:<GraphicsDesign></GraphicsDesign>
            },

            {
                path:'/services/ContentWriting',
                element:<ContentWriting></ContentWriting>
            },

            {
                path:'/services/Recruitment',
                element:<HRRecruitment></HRRecruitment>
            },

            {
                path:'/services/MSOfficeServices',
                element:<MSOfficeServices></MSOfficeServices>
            },

            {
                path:'/contact',
                element:<Contact></Contact>
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

    {
        path:'dashboard',
        element:<Dashboard></Dashboard>,
        children:[

            {
                path:'userhome',
                element:<UserHome></UserHome>
            },
            {
                path:'work',
                element:<Work></Work>
            },

            {
                path:'profile',
                element:<Profile></Profile>
            },
        ]
    },
]);

export default router;