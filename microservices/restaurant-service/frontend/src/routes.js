import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import AdminPage from './pages/AdminPage';
import CreateAdmin from './pages/create-admin';
import UpdateAdmin from './pages/update-admin';
import ClientPage from './pages/ClientPage';
import CreateClient from './pages/create-client';
import UpdateClient from './pages/update-client';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import CreateProduct from './pages/create-product';
import UpdateProduct from './pages/update-product';
import DashboardAppPage from './pages/DashboardAppPage';
import CmdArticlePage from './pages/CmdArticlePage';
import CreateCmdArticle from './pages/create-cmdarticle';
import PayCmdArticle from './pages/pay-cmdarticle';
import UpdateCmdArticle from './pages/update-cmdarticle';
import VoirCmdArticle from './pages/voir-cmdarticle';
import VersementPage from './pages/VersementPage';
import CreateVersement from './pages/create-versement';
import PubPage from './pages/PubPage';
import CreatePub from './pages/create-pub';
import PayPub from './pages/pay-pub';
import UpdatePub from './pages/update-pub';
import VoirPub from './pages/voir-pub';
import HomePage from './pages/HomePage'; // Import the HomePage component
import Signup from './pages/SignupPage'; // Import the HomePage component



// ----------------------------------------------------------------------

export default function Router() {
  const admin = localStorage.getItem("admin");

  const routes = [
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'admin', element: <AdminPage /> },
        { path: 'create-admin', element: <CreateAdmin /> },
        { path: 'update-admin', element: <UpdateAdmin /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <ClientPage /> },
        { path: 'create-client', element: <CreateClient /> },
        { path: 'update-client', element: <UpdateClient /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'create-product', element: <CreateProduct /> },
        { path: 'update-product', element: <UpdateProduct /> },
        { path: 'cmdarticle', element: <CmdArticlePage /> },
        { path: 'create-cmdarticle', element: <CreateCmdArticle /> },
        { path: 'pay-cmdarticle', element: <PayCmdArticle /> },
        { path: 'voir-cmdarticle', element: <VoirCmdArticle /> },
        { path: 'update-cmdarticle', element: <UpdateCmdArticle /> },
        { path: 'versement', element: <VersementPage /> },
        { path: 'create-versement', element: <CreateVersement /> },
        { path: 'pub', element: <PubPage /> },
        { path: 'create-pub', element: <CreatePub /> },
        { path: 'pay-pub', element: <PayPub /> },
        { path: 'update-pub', element: <UpdatePub /> },
        { path: 'voir-pub', element: <VoirPub /> },
        { path: 'update-pub', element: <UpdatePub /> },

      ]
    }
  ];

  const root = [
    // {
    //   path: '/h',
    //   element: <HomePage />, // Render the HomePage component as the root path
    // },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ];

  if (admin) root.push(...routes);

  const useRoot = useRoutes(root);
  return useRoot;
}
