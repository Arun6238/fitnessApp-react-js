import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const NonAuthenticatedRoute = () => {
    const { isAuthenticated } = useAuthStore();
    return (
        <>
            {isAuthenticated?<Navigate to ="/profile"/>:<Outlet/>}
        </>
    );
};

export default NonAuthenticatedRoute;
