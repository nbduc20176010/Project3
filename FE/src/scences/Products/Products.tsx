import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
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
import React from "react";
import ProductCard from "../../components/productCard/productCard";

const { Sider, Content } = Layout;

const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
].map((icon, index) => {
    const key = String(index + 1);

    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,

        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

const Products: React.FC = () => {
    const triggerPagination: PaginationProps["onChange"] = (
        pageNumber,
        pageSize
    ) => {
        console.log(pageNumber);
        console.log(pageSize);
    };

    return (
        <Layout>
            <Sider width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ height: "100%", borderRight: 0 }}
                    items={items2}
                />
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
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
                        <ProductCard
                            imgSrc="game-poster-1.jpg"
                            imgTitle="HALO"
                            imgDesc="key game HALO"
                        />
                        <ProductCard
                            imgSrc="game-poster-2.jpg"
                            imgTitle="Borderland3"
                            imgDesc="key game Borderland3"
                        />
                        <ProductCard
                            imgSrc="game-poster-3.jpg"
                            imgTitle="L.A noire"
                            imgDesc="key game L.A noire"
                        />
                        <ProductCard
                            imgSrc="game-poster-4.jpg"
                            imgTitle="Ironsword"
                            imgDesc="key game Ironsword"
                        />
                        <ProductCard
                            imgSrc="game-poster-5.jpg"
                            imgTitle="HOMICIDE"
                            imgDesc="key game HOMICIDE"
                        />
                        <ProductCard
                            imgSrc="game-poster-6.jpg"
                            imgTitle="E.T"
                            imgDesc="key game E.T"
                        />
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
                            total={50}
                            onChange={triggerPagination}
                        />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Products;
