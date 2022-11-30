import { Button, Card, Col } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

interface iProps {
    imgSrc: string;
    imgTitle: string;
    imgDesc: string;
    price?: number;
}

const { Meta } = Card;

const ProductCard: React.FC<iProps> = ({
    imgSrc,
    imgTitle,
    imgDesc,
    price = 10.0,
}) => {
    const { t } = useTranslation();
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
                            alt={imgTitle}
                            src={`./medias/${imgSrc}`}
                        />
                    }
                >
                    <Meta title={imgTitle} description={imgDesc} />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "10px",
                        }}
                    >
                        <span>{price} $</span>
                        <Button className="card_button" size="small">
                            {t("content.button.detail")}
                        </Button>
                    </div>
                </Card>
            </Col>
        </>
    );
};

export default ProductCard;
