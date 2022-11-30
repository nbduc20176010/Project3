import { HomeOutlined, ShopOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps, Select, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { triggerLoginModal } from "../../store/features/commonSlice";
import { useAppDispatch } from "../../store/store";
import "./index.scss";
import logo from "./moon-svgrepo-com.svg";

const Navbar: React.FC<any> = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();

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

    const openLoginModal = () => {
        dispatch(triggerLoginModal({ modalStatus: true }));
    };

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
                <Button
                    style={{ border: "none", boxShadow: "none" }}
                    onClick={openLoginModal}
                >
                    <Space>
                        <UserAddOutlined />
                        {t("content.login")}
                    </Space>
                </Button>
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
