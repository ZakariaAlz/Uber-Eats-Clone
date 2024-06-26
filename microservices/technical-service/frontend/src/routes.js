import { Navigate, useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "./helpers/AuthContext";

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';
// import ArticlePage from "./pages/ArticlePage"
// import CreateArticle from "./pages/create-article"
// import UpdateArticle from "./pages/update-article"

import ComponentPage from "./pages/ComponentPage"
import CreateComponent from "./pages/create-component"

import LogPage from "./pages/LogPage"



// import MenuPage from './pages/MenuPage';
// import CreateMenu from "./pages/create-menu"
// import UpdateMenu from "./pages/update-menu"
// import OrdersPage from './pages/OrdersPage';

// import ClientPage from "./pages/ClientPage"
// import CreateClient from "./pages/create-client"
// import UpdateClient from "./pages/update-client"

// import OrderPage from "./pages/OrderPage"

import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignupPage';

// ----------------------------------------------------------------------

export default function Router() {
  const { authState } = useContext(AuthContext);
  const isAuthenticated = authState.isAuthenticated;
  console.log(authState);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'profile', element: <ProfilePage /> },

        // { path: 'article', element: <ArticlePage /> },
        // { path: 'create-article', element: <CreateArticle /> },
        // { path: 'update-article', element: <UpdateArticle /> },

        // { path: 'menu', element: <MenuPage /> },
        // { path: 'create-menu', element: <CreateMenu /> },
        // { path: 'update-menu', element: <UpdateMenu /> },

        // { path: 'client', element: <ClientPage /> },
        // { path: 'create-client', element: <CreateClient /> },
        // { path: 'update-client', element: <UpdateClient /> },

        // { path: 'order', element: <OrderPage /> },

        { path: 'component', element: <ComponentPage /> },
        { path: 'create-component', element: <CreateComponent /> },

        { path: 'log', element: <LogPage /> },

      ],
    },
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/dashboard/app" /> : <LoginPage />,
    },
    {
      path: 'signup',
      element: isAuthenticated ? <Navigate to="/dashboard/app" /> : <SignUpPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to={isAuthenticated ? "/dashboard/app" : "/login"} />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}