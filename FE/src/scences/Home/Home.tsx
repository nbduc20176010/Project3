import { Carousel } from "antd";
import React from "react";
import "./index.scss";

const Home: React.FC = () => {
    return (
        <div className="home_component">
            <Carousel className="carousel_component">
                <div id="carousel_1">
                    <div id="carousel_wp1"></div>
                </div>
                <div id="carousel_2">
                    <div className="title_component">
                        <h1 className="title_wp2">giai phap</h1>
                        <h1 className="title_wp2">an ninh mang</h1>
                        <h1 className="title_wp2">cho moi nha</h1>
                    </div>
                    <div id="carousel_wp2"></div>
                </div>
                <div id="carousel_3">
                    <div className="title_component">
                        <h1 className="title_wp3">giai phap</h1>
                        <h1 className="title_wp3">chuyen doi so</h1>
                        <h3>
                            Giải pháp chuyển đổi số cho doanh nghiệp lớn <br />{" "}
                            Giúp doanh nghiệp thông minh hơn, dễ dàng thích{" "}
                            <br /> ứng với thay đổi của thị trường
                        </h3>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Home;
