import Redirect from "./pages/utils/Redirect.js";
import React from "react";
import Login from "./pages/Auth/Login.jsx";
import Preloader from "./pages/companents/Preloader.jsx";
import Register from "./pages/Auth/Register.jsx";

export const AuthenticatedRoutes = []

export const NoAuthRoutes = [{
    path: "/",
    exact:true,
    companent: <>
        <Preloader />
        <Redirect url="/login" delay={2000}/>
    </>
},{
    path: "/login",
    companent: <Login/>
},{
    path: "/register",
    companent: <Register/>
}];