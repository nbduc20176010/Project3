import { Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

type Props = {};

const Missing: React.FC = (props: Props) => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000);
    }, [navigate]);
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <img src="/medias/404_img.jpg" alt="missing_url_img" />
            <div style={{ display: "flex" }}>
                <h1 style={{ fontSize: "26px" }}>redirect in 5s</h1>
                <Spin />
            </div>
        </div>
    );
};

export default Missing;
