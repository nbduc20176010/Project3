import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

const DefaultLayout: React.FC = () => {
    return (
        <div
            className="App"
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default DefaultLayout;
