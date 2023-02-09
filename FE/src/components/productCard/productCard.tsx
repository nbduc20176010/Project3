import { Button, Card, Col } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import "./index.scss";

interface iProps {
    id: string;
    img: string;
    title: string;
    description: string;
    price: number;
    image?: any;
}

const { Meta } = Card;

const ProductCard: React.FC<iProps> = ({
    id,
    img,
    title,
    description,
    price,
    image,
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const openDetailPage = () => {
        navigate(`${id}`);
    };
    return (
        <>
            <Col span={6}>
                <Card
                    style={{
                        width: 240,
                        padding: "5px",
                        borderRadius: "10px",
                    }}
                    className="product_card_container"
                    cover={
                        <img
                            className="product_card_img"
                            style={{
                                height: "240px",
                            }}
                            alt={title}
                            src={
                                image
                                    ? `http://localhost:5000/${image.data}`
                                    : `./medias/${img}`
                            }
                        />
                    }
                >
                    <Meta title={title} description={description} />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "10px",
                        }}
                    >
                        <span>{price} $</span>
                        <Button
                            className="card_button"
                            size="small"
                            onClick={openDetailPage}
                        >
                            {t("content.button.detail")}
                        </Button>
                    </div>
                </Card>
            </Col>
        </>
    );
};

export default ProductCard;
