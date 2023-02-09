import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./scences/Home/Home";
import Products from "./scences/Products/Products";
import DefaultLayout from "./scences/layout";
import Missing from "./scences/Missing";
import Login from "./scences/Login/Login";
import ProductDetail from "./scences/ProductDetail/ProductDetail";
import { useAppSelector } from "./store/store";
import Admin from "./scences/Admin/Admin";
import UserInformation from "./scences/UserInformation/UserInformation";

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(
        localStorage.getItem("role") === "admin" ? true : false
    );
    const [isMember, setIsMember] = useState(
        localStorage.getItem("role") === "member" ? true : false
    );
    const checkLogin = useAppSelector((state) => state.auth.checkLogin);

    const ProtectedRoute = ({ redirectPath, children }: any) => {
        if (!isAdmin && !isMember) {
            return <Navigate to={redirectPath} replace />;
        }
        return children;
    };

    useEffect(() => {
        if (checkLogin) {
            localStorage.getItem("role") === "admin"
                ? setIsAdmin(true)
                : setIsAdmin(false);

            localStorage.getItem("role") === "member"
                ? setIsMember(true)
                : setIsMember(false);
        }
    }, [checkLogin]);

    return (
        <Layout>
            <Login />
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="products">
                        <Route index element={<Products />} />
                        <Route path=":id" element={<ProductDetail />} />
                    </Route>
                    <Route
                        path="admin"
                        element={
                            <ProtectedRoute redirectPath="/404">
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="user"
                        element={
                            <ProtectedRoute redirectPath="/404">
                                <UserInformation />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
        </Layout>
    );
};

export default App;
