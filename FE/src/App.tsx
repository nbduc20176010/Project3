import { Layout } from "antd";
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./scences/Home/Home";
import Products from "./scences/Products/Products";
import DefaultLayout from "./scences/layout";
import Missing from "./scences/Missing";
import Login from "./scences/Login/Login";

const App: React.FC = () => {
    return (
        <Layout>
            <Login />
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
        </Layout>
    );
};

export default App;
