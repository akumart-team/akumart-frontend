import { useRoutes } from "react-router";
import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Home, ForgetPassword, Privacy, Register, SignIn } from "../pages";
import { ScrollToTop } from "../components/layout/ScrollToTop";
import {Header} from "../components/layout/Header";
import {Footer} from "../components/layout/Footer";

// Layout WITH Header & Footer — for public/landing pages
const MainLayout = () => (
  <>
    <ScrollToTop />
    <Header />
    <Outlet />
    <Footer />
  </>
);

// Layout WITHOUT Header & Footer — for auth pages
const AuthLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export function Routes() {
  const routes: RouteObject[] = [
    // Landing page — has Header + Footer
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/privacy", element: <Privacy /> },
      ],
    },

    // Auth pages — no Header or Footer
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "/signin", element: <SignIn /> },
        { path: "/register", element: <Register /> },
        { path: "/forgot-password", element: <ForgetPassword /> },
      ],
    },
  ];

  return useRoutes(routes);
}