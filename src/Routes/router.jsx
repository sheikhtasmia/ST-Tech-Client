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
import AllUser from "../Pages/AdminDashboardPage/AllUser/AllUser";
import AddMember from "../Pages/AdminDashboardPage/AddMember/AddMember";
import ManageMember from "../Pages/AdminDashboardPage/ManageMembers/ManageMember";
import AdminDashboard from "../Pages/AdminDashboardPage/AdminDashboard/AdminDashboard";
import About from "../Pages/About/About";
import Portfolio from "../Pages/Portfolio/Portfolio";
import AddPortfolio from "../Pages/AdminDashboardPage/AddPortfolio/AddPortfolio";
import ManagePortfolio from "../Pages/AdminDashboardPage/AddPortfolio/ManagePortfolio";
import MyWork from "../Pages/DashboardPage/MyWork/MyWork";
import AllWorks from "../Pages/AdminDashboardPage/AllWorks/AllWorks";

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
                path: '/about',
                element: <About></About>
            },

            {
                path: '/portfolio',
                element: <Portfolio></Portfolio>
            },

            {
                path: '/services/web-development',
                element: <WebDevelopment></WebDevelopment>
            },

            {
                path: '/services/digital-marketing',
                element: <DigitalMarketing></DigitalMarketing>
            },


            {
                path: '/services/seo',
                element: <SEO></SEO>
            },

            {
                path: '/services/data-analysis',
                element: <DataAnlysis></DataAnlysis>
            },

            {
                path: '/services/GraphicsDesign',
                element: <GraphicsDesign></GraphicsDesign>
            },

            {
                path: '/services/ContentWriting',
                element: <ContentWriting></ContentWriting>
            },

            {
                path: '/services/Recruitment',
                element: <HRRecruitment></HRRecruitment>
            },

            {
                path: '/services/MSOfficeServices',
                element: <MSOfficeServices></MSOfficeServices>
            },

            {
                path: '/contact',
                element: <Contact></Contact>
            },

            {
                path: '/login',
                element: <Login></Login>
            },

            {
                path: '/registration',
                element: <Registration></Registration>
            },
        ],
    },

    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [

            // aigula user routes

            {
                path: 'userhome',
                element: <UserHome></UserHome>
            },
            {
                path: 'work',
                element: <Work></Work>
            },

            {
                path:'see-work',
                element:<MyWork></MyWork>
            },

            {
                path: 'profile',
                element: <Profile></Profile>
            },


            // aigula admin routes

            {
                path: 'adminhome',
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: 'alluser',
                element: <AllUser></AllUser>
            },

            {
                path: 'addmember',
                element: <AddMember></AddMember>
            },

            {
                path: 'manageuser',
                element: <ManageMember></ManageMember>
            },

            {
                path: 'manage-portfolio',
                element: <ManagePortfolio></ManagePortfolio>
            },

            {
                path: 'addportfolio',
                element: <AddPortfolio></AddPortfolio>
            },

            {
                path:'All-work',
                element:<AllWorks></AllWorks>
            },
        ]
    },
]);

export default router;