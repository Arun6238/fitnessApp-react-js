import React from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoutes = () => {
    const { isAuthenticated } = useAuthStore();
    return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login"/>}</>;
};

export default AuthenticatedRoutes;
