import {
    Breadcrumb,
    Button,
    Descriptions,
    Layout,
    message,
    Modal,
    Select,
    Space,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { triggerLoginModal } from "../../store/features/commonSlice";
import { createOrder, resetOrderStatus } from "../../store/features/orderSlice";
import { getProductById } from "../../store/features/productSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import "./index.scss";

const { Text } = Typography;

interface iSelectOption {
    label: string;
    value: number;
}

const selectOption: iSelectOption[] = [];
for (let i = 1; i <= 10; i++) {
    selectOption.push({
        label: `${i}`,
        value: i,
    });
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const detail = useAppSelector((state) => state.products.detail);
    const orderStatus = useAppSelector((state) => state.order.loading);
    const [numOfItems, setNumOfItems] = useState(1);
    const [total, setTotal] = useState(0);
    const [orderModalVisible, setOrderModalVisible] = useState(false);

    const triggerBuyFunction = () => {
        !localStorage.getItem("username")
            ? dispatch(triggerLoginModal({ modalStatus: true }))
            : setOrderModalVisible(true);
    };

    const submitOrder = () => {
        dispatch(
            createOrder({
                userId: localStorage.getItem("member"),
                productId: detail?._id,
                productName: detail?.title,
                quantity: numOfItems,
                total: total,
            })
        );
        setOrderModalVisible(false);
    };

    useEffect(() => {
        if (detail) {
            setTotal(detail.price * numOfItems);
        }
        if (orderStatus === "finish") {
            message.open({
                type: "success",
                content: "Success createing order!",
            });
            dispatch(resetOrderStatus());
        } else if (orderStatus === "failed") {
            message.open({
                type: "warning",
                content: "Fail createing order!",
            });
            dispatch(resetOrderStatus());
        }
    }, [dispatch, detail, numOfItems, orderStatus]);

    useEffect(() => {
        dispatch(getProductById(id || ""));
    }, [dispatch, id]);

    return (
        <>
            <Layout style={{ padding: "0 24px 24px" }}>
                <div className="product_detail_container">
                    <div className="product_detail_img">
                        <img
                            src={`/medias/${detail?.img}`}
                            alt={detail?.title}
                        />
                    </div>
                    <div className="product_detail_func">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">{t("content.Home")}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/">{t("content.Products")}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{detail?.title}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="product_detail_contents">
                            <h2>{detail?.title}</h2>
                            <h3>
                                {detail?.price} {detail?.currency}
                            </h3>
                            <h3>
                                {t("content.product_current_status")}{" "}
                                {detail?.quantity === 0
                                    ? t("content.product_unavailable")
                                    : t("content.product_available  ")}
                            </h3>
                            <h3>
                                <span>
                                    {t("content.product_category_desc")}
                                </span>{" "}
                                {detail?.category}
                            </h3>
                            <Descriptions
                                bordered
                                title={t("content.Product_desc")}
                                style={{
                                    minHeight: "150px",
                                }}
                                contentStyle={{
                                    backgroundColor: "#ffffff",
                                }}
                            >
                                <Descriptions.Item>
                                    {detail?.description}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="product_buy_options">
                            <div style={{ marginTop: "15px" }}>
                                <Space size="middle">
                                    <Select
                                        defaultValue={numOfItems}
                                        style={{ width: 80 }}
                                        listHeight={200}
                                        showArrow={true}
                                        onChange={(value: number) => {
                                            setNumOfItems(value);
                                        }}
                                        options={selectOption}
                                        disabled={detail?.quantity === 0}
                                    />
                                    <Button
                                        className="buy_product_button"
                                        type="primary"
                                        onClick={triggerBuyFunction}
                                        disabled={detail?.quantity === 0}
                                    >
                                        {t("content.button.buy_product")}
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <Modal
                width={500}
                title={t("content.orderTitle")}
                open={orderModalVisible}
                footer={null}
                onCancel={() => setOrderModalVisible(false)}
            >
                <div style={{ display: "flex", marginBottom: "10px" }}>
                    <div style={{ width: "50%" }}>
                        <p>User : {localStorage.getItem("username")}</p>
                        <p>Product : {detail?.title}</p>
                        <p>Quantity : {numOfItems}</p>
                        <p>
                            Total : {total} {detail?.currency}
                        </p>
                        <Text type="danger">
                            {detail?.quantity && detail?.quantity < numOfItems
                                ? "Only " +
                                  detail.quantity +
                                  " items left! Please reselect number of items that you wan't to purchase"
                                : "Able to make new order"}
                        </Text>
                    </div>
                    <div
                        style={{
                            width: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            style={{ width: "200px" }}
                            src={`/medias/${detail?.img}`}
                            alt="product img"
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Space size="small">
                        <Button
                            onClick={submitOrder}
                            loading={orderStatus === "loading"}
                            type="primary"
                            disabled={
                                detail?.quantity &&
                                detail?.quantity < numOfItems
                                    ? true
                                    : false
                            }
                        >
                            Submit
                        </Button>
                        <Button onClick={() => setOrderModalVisible(false)}>
                            Cancel
                        </Button>
                    </Space>
                </div>
            </Modal>
        </>
    );
};

export default ProductDetail;
