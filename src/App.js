import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useLocalState from "./customHooks/useLocalState";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login/Login";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import Register from "./pages/Register/Register";

export default function App() {
    const [user, setUser] = useLocalState("user", {});

    useEffect(() => {
        if (
            !user?.access_token &&
            window.location.pathname !== "/login" &&
            !window.location.pathname.includes("shop")
        ) {
            window.location.replace("/login");
        }
    }, []);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password-reset">
                        <PasswordReset />
                    </Route>
                    <Route path="/reg">
                        <Register />
                    </Route>
                    <Route path="/shop/:shopId">
                        <ProductsPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
