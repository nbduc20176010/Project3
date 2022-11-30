import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./index.scss";
import logo from "./moon-svgrepo-com.svg";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="footer_component">
            <div>
                <div id="logo_bottom">
                    <img id="logo_img" src={logo} alt="logo_bottom" />
                    <span> ISO 27001 ISO 9001 </span>
                </div>
                <div id="link_bottom">
                    <span>© 1995 - 2022 Moon Corporation</span>
                    <div id="footer_links">
                        <Link to="/privacy">
                            {t("content.footer.privacy_policy")}
                        </Link>{" "}
                        |{" "}
                        <Link to="/termOfUse">
                            {t("content.footer.term_of_use")}
                        </Link>{" "}
                        |{" "}
                        <Link to="/contact">
                            {t("content.footer.contact_us")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
