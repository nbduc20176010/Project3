import {
    DesktopOutlined,
    GiftOutlined,
    MoneyCollectOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import {
    Breadcrumb,
    Layout,
    Menu,
    MenuProps,
    Pagination,
    PaginationProps,
    Row,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../../components/productCard/productCard";
import { getActiveProduct } from "../../store/features/productSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const { Sider, Content } = Layout;

const Products: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.result);
    const total = useAppSelector((state) => state.products.total);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [currentCategory, setCategory] = useState("");

    const changeCategory = (category: string) => {
        setCategory(category);
        setPageNumber(1);
    };

    const items2: MenuProps["items"] = [
        {
            key: "show_all_category",
            icon: <ShopOutlined />,
            label: `${t("content.category.show_all_category")}`,
            onClick: () => changeCategory(""),
        },
        {
            key: "game_category",
            icon: <DesktopOutlined />,
            label: `${t("content.category.game_category")}`,
            onClick: () => changeCategory("Game"),
        },
        {
            key: "gift_coupon_category",
            icon: <GiftOutlined />,
            label: `${t("content.category.gift_coupon")}`,
            onClick: () => changeCategory("Gift coupon"),
        },
        {
            key: "card_category",
            icon: <MoneyCollectOutlined />,
            label: `${t("content.category.card_category")}`,
            onClick: () => changeCategory("Card"),
        },
    ];

    const triggerPagination: PaginationProps["onChange"] = (
        pageNumber,
        pageSize
    ) => {
        setPageNumber(pageNumber);
        setPageSize(pageSize);
    };

    useEffect(() => {
        dispatch(
            getActiveProduct({
                category: currentCategory,
                page: pageNumber,
                size: pageSize,
            })
        );
    }, [dispatch, pageNumber, pageSize, currentCategory]);

    return (
        <Layout>
            <Sider width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["show_all_category"]}
                    style={{ height: "100%", borderRight: 0 }}
                    items={items2}
                />
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>{t("content.Home")}</Breadcrumb.Item>
                    <Breadcrumb.Item>{t("content.Products")}</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Row gutter={[8, 16]}>
                        {products.map((item, index) => (
                            <ProductCard
                                key={item.title + index}
                                id={item._id}
                                {...item}
                            />
                        ))}
                    </Row>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "20px",
                        }}
                    >
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={8}
                            total={total}
                            onChange={triggerPagination}
                        />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Products;
