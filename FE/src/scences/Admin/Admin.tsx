import {
    BellOutlined,
    PlusCircleOutlined,
    ShopOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Button,
    Layout,
    Menu,
    MenuProps,
    Popconfirm,
    Space,
    Table,
    Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    changeUserStatus,
    deleteProduct,
    editProductDetail,
    getAllUser,
    getProductById,
    getAllOrders,
    getProductList,
    changeOrderStatus,
} from "../../store/features/adminSlice";
import { triggerEditModal } from "../../store/features/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import ProductModal from "./ProductModal";

type Props = {};

const { Sider, Content } = Layout;

const Admin: React.FC = (props: Props) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loadingStatus = useAppSelector((state) => state.admin.status);
    const productsList = useAppSelector((state) => state.admin.products);
    const usersList = useAppSelector((state) => state.admin.users);
    const ordersList = useAppSelector((state) => state.admin.orders);
    const [currentCategory, setCurrentCategory] = useState("product_list");
    const [pageNumber, setPageNumber] = useState(1);
    const [total, setTotal] = useState(productsList.total);

    const changeCategory = (category: string) => {
        setPageNumber(1);
        setCurrentCategory(category);
    };

    const items2: MenuProps["items"] = [
        {
            key: "product_list",
            icon: <ShopOutlined />,
            label: `${t("content.category.product_list")}`,
            onClick: () => changeCategory("product_list"),
        },
        {
            key: "user_list",
            icon: <UserOutlined />,
            label: `${t("content.category.user_list")}`,
            onClick: () => changeCategory("user_list"),
        },
        {
            key: "order_list",
            icon: <BellOutlined />,
            label: `${t("content.category.order_list")}`,
            onClick: () => changeCategory("order_list"),
        },
    ];

    const productColumns = [
        { key: "id", title: "Id", dataIndex: "_id" },
        { key: "title", title: "Title", dataIndex: "title" },
        { key: "category", title: "Category", dataIndex: "category" },
        { key: "description", title: "Description", dataIndex: "description" },
        { key: "price", title: "Price", dataIndex: "price" },
        { key: "quantity", title: "Quantity", dataIndex: "quantity" },
        {
            key: "status",
            title: "Status",
            render: (record: any, _: any) => (
                <Tag
                    color={
                        record.quantity === 0 || record.status === "delete"
                            ? "red"
                            : "green"
                    }
                >
                    {record.status === "delete"
                        ? "Deleted"
                        : record.quantity === 0
                        ? "Unavailable"
                        : "Available"}
                </Tag>
            ),
        },
        {
            key: "actions",
            title: "Actions",
            render: (record: any, _: any) => (
                <Space size="small">
                    <Button
                        size="small"
                        type="primary"
                        onClick={() => dispatch(getProductById(record._id))}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        onClick={() =>
                            dispatch(
                                editProductDetail({
                                    _id: record._id,
                                    status: "active",
                                })
                            )
                        }
                    >
                        Active
                    </Button>
                    <Popconfirm
                        title="Are you sure ?"
                        onConfirm={() => dispatch(deleteProduct(record._id))}
                    >
                        <Button size="small" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const userColumns = [
        { key: "_id", title: "Id", dataIndex: "_id" },
        { key: "username", title: "Username", dataIndex: "username" },
        { key: "email", title: "Email", dataIndex: "email" },
        {
            key: "status",
            title: "Status",
            render: (record: any, _: any) => (
                <Tag color={record.status === "active" ? "green" : "red"}>
                    {record.status === "active" ? "Activated" : "Unactivated"}
                </Tag>
            ),
        },
        {
            key: "actions",
            title: "Actions",
            render: (record: any, _: any) => (
                <Space size="small">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() =>
                            dispatch(
                                changeUserStatus({
                                    _id: record._id,
                                    status: "active",
                                })
                            )
                        }
                        disabled={record.status === "active" ? true : false}
                    >
                        Active
                    </Button>
                    <Button
                        size="small"
                        disabled={record.status === "deactive" ? true : false}
                        onClick={() =>
                            dispatch(
                                changeUserStatus({
                                    _id: record._id,
                                    status: "deactive",
                                })
                            )
                        }
                        danger
                    >
                        Deactive
                    </Button>
                </Space>
            ),
        },
    ];

    const orderColumns = [
        { key: "userId", title: "UserId", dataIndex: "userId" },
        { key: "productId", title: "ProductId", dataIndex: "productId" },
        { key: "quantity", title: "Quantity", dataIndex: "quantity" },
        { key: "total", title: "Total", dataIndex: "total" },
        {
            key: "status",
            title: "Status",
            render: (record: any, _: any) => (
                <Tag
                    color={
                        record.status === "Pending"
                            ? "blue"
                            : record.status === "Approved"
                            ? "green"
                            : "red"
                    }
                >
                    {record.status === "Pending"
                        ? "Pending"
                        : record.status === "Approved"
                        ? "Approved"
                        : "Unapproved"}
                </Tag>
            ),
        },
        {
            key: "actions",
            title: "Actions",
            render: (record: any, _: any) => (
                <Space size="small">
                    <Button
                        type="primary"
                        size="small"
                        disabled={
                            record.status === "Approved" ||
                            record.status === "Unapproved"
                        }
                        onClick={() =>
                            dispatch(
                                changeOrderStatus({
                                    _id: record._id,
                                    status: "Approved",
                                })
                            )
                        }
                    >
                        Approve
                    </Button>
                    <Button
                        size="small"
                        danger
                        disabled={
                            record.status === "Approved" ||
                            record.status === "Unapproved"
                        }
                        onClick={() =>
                            dispatch(
                                changeOrderStatus({
                                    _id: record._id,
                                    status: "Unapproved",
                                })
                            )
                        }
                    >
                        Unapprove
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        if (total !== productsList.total) {
            setTotal(productsList.total);
            dispatch(
                getProductList({
                    category: "all",
                    page: pageNumber,
                    size: 5,
                })
            );
        }
        switch (currentCategory) {
            case "product_list":
                dispatch(
                    getProductList({
                        category: "all",
                        page: pageNumber,
                        size: 5,
                    })
                );
                break;
            case "user_list":
                dispatch(
                    getAllUser({
                        page: pageNumber,
                        size: 5,
                    })
                );
                break;
            case "order_list":
                dispatch(
                    getAllOrders({
                        page: pageNumber,
                        size: 5,
                    })
                );
                break;
            default:
                break;
        }
    }, [currentCategory, dispatch, pageNumber, productsList.total, total]);

    return (
        <>
            <Layout>
                <Sider width={220}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["product_list"]}
                        style={{ height: "100%", borderRight: 0 }}
                        items={items2}
                    />
                </Sider>
                <Layout style={{ padding: "24px 24px" }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            backgroundColor: "#ffffff",
                        }}
                    >
                        {currentCategory === "product_list" ? (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            dispatch(
                                                triggerEditModal({
                                                    modalStatus: true,
                                                })
                                            )
                                        }
                                    >
                                        Add <PlusCircleOutlined />
                                    </Button>
                                </div>
                                <Table
                                    columns={productColumns}
                                    loading={
                                        loadingStatus === "loading"
                                            ? true
                                            : false
                                    }
                                    dataSource={productsList.result}
                                    rowKey={(record: any) => record._id}
                                    pagination={{
                                        total: total,
                                        pageSize: 5,
                                        onChange(page, _) {
                                            setPageNumber(page);
                                        },
                                    }}
                                />
                            </>
                        ) : currentCategory === "user_list" ? (
                            <Table
                                columns={userColumns}
                                loading={
                                    loadingStatus === "loading" ? true : false
                                }
                                dataSource={usersList.result}
                                rowKey={(record: any) => record._id}
                                pagination={{
                                    total: usersList.total,
                                    pageSize: 5,
                                    onChange(page, _) {
                                        setPageNumber(page);
                                    },
                                }}
                            />
                        ) : (
                            <Table
                                columns={orderColumns}
                                loading={
                                    loadingStatus === "loading" ? true : false
                                }
                                dataSource={ordersList.result}
                                rowKey={(record: any) => record._id}
                                pagination={{
                                    total: ordersList.total,
                                    pageSize: 5,
                                    onChange(page, _) {
                                        setPageNumber(page);
                                    },
                                }}
                            />
                        )}
                    </Content>
                </Layout>
            </Layout>
            <ProductModal />
        </>
    );
};

export default Admin;
