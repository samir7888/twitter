import React, { JSX } from "react";
import LoginPage from "../../pages/LoginPage";
import { ReactNode } from "react";
import {  useNavigate } from "react-router-dom";

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
    const navigate = useNavigate();
    const isAuthenticated: boolean = true; // Replace with your actual authentication logic
    if (!isAuthenticated) {
        navigate("/login" ,{replace: true}); // Redirect to login page if not authenticated
        return <LoginPage />; // Redirect to login page if not authenticated
    }
    return <>{children}</>;
};