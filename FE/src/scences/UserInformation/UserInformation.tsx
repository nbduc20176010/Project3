import { HistoryOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
    getOrderHistory,
    getUserInformationById,
} from "../../store/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const { Content, Sider } = Layout;

const UserInformation: React.FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const userInformations = useAppSelector((state) => state.user);
    const orderHistory = useAppSelector((state) => state.user.orderHistory);
    const [currentMenu, setCurrentMenu] = useState("user_informations");

    const changeMenu = (menu: string) => {
        if (menu === "order_history") {
            const userId = localStorage.getItem("member") || "";
            dispatch(getOrderHistory(userId));
        }
        setCurrentMenu(menu);
    };

    const items2: MenuProps["items"] = [
        {
            key: "user_informations",
            icon: <UserOutlined />,
            label: `${t("content.category.user_informations")}`,
            onClick: () => changeMenu("user_informations"),
        },
        {
            key: "order_history",
            icon: <HistoryOutlined />,
            label: `${t("content.category.order_history")}`,
            onClick: () => changeMenu("order_history"),
        },
    ];
    const orderColumns = [
        { key: "_id", title: "Id", dataIndex: "_id" },
        { key: "productName", title: "Product name", dataIndex: "productName" },
        { key: "quantity", title: "Quantity", dataIndex: "quantity" },
        { key: "total", title: "Total", dataIndex: "total" },
        {
            key: "status",
            title: "Status",
            render: (record: any, _: any) => (
                <Tag
                    color={
                        record.status === "Approved"
                            ? "green"
                            : record.status === "Pending"
                            ? "blue"
                            : "red"
                    }
                >
                    {record.status === "Approved"
                        ? "Approved"
                        : record.status === "Pending"
                        ? "Pending"
                        : "Unapproved"}
                </Tag>
            ),
        },
    ];

    useEffect(() => {
        const userId = localStorage.getItem("member");
        if (userId) {
            dispatch(getUserInformationById(userId));
        }
    }, [dispatch]);

    return (
        <>
            <Layout>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[currentMenu]}
                        style={{ height: "100%", borderRight: 0 }}
                        items={items2}
                    />
                </Sider>
                <Content
                    style={{
                        padding: 24,
                        margin: 24,
                        minHeight: 280,
                        backgroundColor: "#ffffff",
                    }}
                >
                    {currentMenu === "user_informations" ? (
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            <div style={{ width: "50%" }}>
                                <h1>Username : {userInformations.username}</h1>
                                <h1>Email : {userInformations.email}</h1>
                                <h1>
                                    Role :{" "}
                                    {userInformations.isAdmin
                                        ? "Admin"
                                        : "Member"}
                                </h1>
                                {userInformations.isAdmin && (
                                    <Link to="/admin">
                                        go to admin management page
                                    </Link>
                                )}
                            </div>
                            <div style={{ width: "50%" }}>
                                <img
                                    style={{
                                        width: "200px",
                                    }}
                                    alt="user-img-avatar"
                                    src="./medias/blank-profile.webp"
                                />
                            </div>
                        </div>
                    ) : (
                        <Table
                            columns={orderColumns}
                            dataSource={orderHistory}
                            rowKey={(record: any) => record._id}
                            expandable={{
                                expandedRowRender: (record) =>
                                    record.key?.map((item) => (
                                        <p style={{ margin: 0 }}>
                                            Key : {item}
                                        </p>
                                    )),
                                rowExpandable: (record) =>
                                    record.key?.length > 0,
                            }}
                            pagination={{
                                pageSize: 5,
                            }}
                        />
                    )}
                </Content>
            </Layout>
        </>
    );
};

export default UserInformation;
