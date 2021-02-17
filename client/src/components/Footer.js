import React from "react";
import { Layout, Tag } from "antd";
import {
    TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
} from "@ant-design/icons";
const Footer = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer
                style={{
                    textAlign: "center",
                    backgroundColor: "black",
                    color: "whiteSmoke",
                }}
            >
                <Tag icon={<TwitterOutlined />} color="#55acee">
                    <a href="https://twitter.com/wang_crypto" target="_blank">
                        Twitter
                    </a>
                </Tag>
                <Tag icon={<YoutubeOutlined />} color="#cd201f">
                    Youtube
                </Tag>
                <Tag icon={<FacebookOutlined />} color="#3b5999">
                    Facebook
                </Tag>
                <Tag icon={<LinkedinOutlined />} color="#55acee">
                    LinkedIn
                </Tag>
                <div>
                    <br />
                    <strong>Akiakmapro@gmail.com</strong>
                    <br />
                    Copyright ©2021 Austin Hyunjun Kim | All Rights Reserved
                </div>
            </Footer>
        </>
    );
};

export default Footer;
