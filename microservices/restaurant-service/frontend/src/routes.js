import { Navigate, useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "./helpers/AuthContext";

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
// import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ArticlePage from "./pages/ArticlePage"
import CreateArticle from "./pages/create-article"
import UpdateArticle from "./pages/update-article"

// import MenusPage from './pages/MenusPage';
// import OrdersPage from './pages/OrdersPage';
// import ProfilePage from './pages/ProfilePage';
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
        // { path: 'profile', element: <ProfilePage /> },
        // { path: 'user', element: <UserPage /> },
        // { path: 'products', element: <ProductsPage /> },
        { path: 'article', element: <ArticlePage /> },
        { path: 'create-article', element: <CreateArticle /> },
        { path: 'update-article', element: <UpdateArticle /> },


        // { path: 'menus', element: <MenusPage /> },
        // { path: 'orders', element: <OrdersPage /> },
        // // { path: 'blog', element: <BlogPage /> },
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