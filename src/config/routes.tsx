import { useRoutes } from "react-router";
import type { RouteObject } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import {
  Home,
  ForgetPassword,
  Privacy,
  Register,
  SignIn,
  BuyerDashboard,
  SellerDashboard,
  Orders,
  AIRecommendation,
  Settings,
  OrderPayment,
  Analytics,
  ForYou,
  MyListings,
  SellerSettings,
} from "../pages";
import { ScrollToTop } from "../components/layout/ScrollToTop";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import BuyerLayout from "../components/layout/BuyerLayout";
import SellerLayout from "../components/layout/SellerLayout";

import { useAuthStore } from "../store";

// Layouts

const MainLayout = () => (
  <>
    <ScrollToTop />
    <Header />
    <Outlet />
    <Footer />
  </>
);

const AuthLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

// Protects dashboard routes — redirects to /signin if not logged in
const ProtectedRoute = ({
  allowedRole,
}: {
  allowedRole: "seller" | "buyer";
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role !== allowedRole) {
    // Wrong role — send them to their own dashboard
    return <Navigate to={`/${user?.role}/dashboard`} replace />;
  }

  return <Outlet />;
};

//  Routes

export function Routes() {
  const routes: RouteObject[] = [
    // Landing page — Header + Footer
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/privacy", element: <Privacy /> },
      ],
    },

    // Auth pages — no layout
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "/signin", element: <SignIn /> },
        { path: "/register", element: <Register /> },
        { path: "/forgot-password", element: <ForgetPassword /> },
      ],
    },

    // Seller dashboard — protected, seller only
    {
      path: "/seller",
      // element: <ProtectedRoute allowedRole="seller" />,
      children: [
        {
          element: <SellerLayout />,
          children: [
            { path: "dashboard", element: <SellerDashboard /> },
            { path: "analytics", element: <Analytics /> },
            { path: "for-you", element: <ForYou /> },
            { path: "My-listings", element: <MyListings /> },
            { path: "settings", element: <SellerSettings /> },
          ],
        },
      ],
    },

    // Buyer dashboard — protected, buyer only

    {
      path: "/buyer",
      element: <ProtectedRoute allowedRole="buyer" />,
      children: [
        {
          element: <BuyerLayout />,
          children: [
            { path: "dashboard", element: <BuyerDashboard /> },
            { path: "orders", element: <Orders /> },
            { path: "settings", element: <Settings /> },
            { path: "AIRecomendation", element: <AIRecommendation /> },

            { path: "checkout", element: <OrderPayment /> },
          ],
        },
      ],
    },
  ];

  return useRoutes(routes);
}
