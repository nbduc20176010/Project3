import { HomeOutlined, ShopOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, MenuProps, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { logOut, resetAuthStatus } from "../../store/features/authSlice";
import { triggerLoginModal } from "../../store/features/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import "./index.scss";
import logo from "./moon-svgrepo-com.svg";

const Navbar: React.FC<any> = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginCheck = useAppSelector((state) => state.auth.checkLogin);
    const [loginMember, setLoginMember] = useState(
        localStorage.getItem("member")
    );
    const [username, setUsername] = useState(localStorage.getItem("username"));

    const openLoginModal = () => {
        dispatch(triggerLoginModal({ modalStatus: true }));
    };

    const logOutTrigger = () => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(logOut(token));
        }
    };

    const navigateTrigger = () => {
        navigate("/user");
    };

    const itemList: MenuProps["items"] = [
        { label: <img id="logo_navbar" src={logo} alt="logo" />, key: "logo" },
        {
            label: <Link to="/">{t("content.Home")}</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/products">{t("content.Products")}</Link>,
            key: "products",
            icon: <ShopOutlined />,
        },
    ];

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <div onClick={navigateTrigger}>
                    {t("content.userInformation")}
                </div>
            ),
        },
        {
            key: "2",
            label: (
                <div onClick={logOutTrigger} style={{ cursor: "pointer" }}>
                    {t("content.button.logout")}
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (loginCheck) {
            if (localStorage.getItem("member")) {
                setLoginMember(localStorage.getItem("member"));
                setUsername(localStorage.getItem("username"));
            } else {
                setLoginMember(null);
                setUsername(null);
                dispatch(resetAuthStatus());
            }
        }
    }, [loginCheck, dispatch]);

    return (
        <div className="navbar_component">
            <Menu
                items={itemList}
                mode="horizontal"
                style={{
                    backgroundColor: "transparent",
                    borderBottom: "none",
                }}
            />
            <div
                style={{
                    display: "flex",
                    gap: "1em",
                    marginRight: "2em",
                    alignItems: "center",
                }}
            >
                {loginMember ? (
                    <Dropdown
                        menu={{ items }}
                        placement="bottomRight"
                        trigger={["click"]}
                    >
                        <Space style={{ cursor: "pointer" }}>
                            <UserAddOutlined />
                            <span>{username}</span>
                        </Space>
                    </Dropdown>
                ) : (
                    <Button
                        style={{ border: "none", boxShadow: "none" }}
                        onClick={openLoginModal}
                    >
                        <Space>
                            <UserAddOutlined />
                            {t("content.login")}
                        </Space>
                    </Button>
                )}
                <Select
                    defaultValue={i18n.language}
                    options={[
                        { value: "en", label: "EN" },
                        { value: "vi", label: "VI" },
                    ]}
                    onChange={(value: string) => i18n.changeLanguage(value)}
                />
            </div>
        </div>
    );
};

export default Navbar;
