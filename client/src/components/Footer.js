import React from "react";
import { Divider, Layout, Tag } from "antd";
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
            <Divider></Divider>
            <Footer
                style={{
                    textAlign: "center",
                    backgroundColor: "#F0F2F5",
                    color: "black",

                    height: "100%",
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
                    <strong>akiakmapro@gmail.com</strong>
                    <br />
                    Copyright ©2020 Austin Hyunjun Kim | All Rights Reserved
                </div>
            </Footer>
        </>
    );
};

export default Footer;
