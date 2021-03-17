import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { List, Avatar, Space } from "antd";
import {
    MessageOutlined,
    LikeOutlined,
    StarOutlined,
    EditOutlined,
    FieldTimeOutlined,
    EyeOutlined,
} from "@ant-design/icons";

const PostCardCategorySearched = ({ posts }) => {
    console.log("1");
    // console.log(posts);
    const iteration = () => {
        posts &&
            posts.map(item => {
                listData.push({
                    key: item._id,
                    href: `/board/post/${item._id}`,
                    title: item.title,
                    avatar:
                        "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                    description: "↑ click to read this article",
                    content:
                        item.contents
                            .replace(/(<([^>]+)>)/gi, "")
                            .substring(0, 50) + " ..",
                    date: item.date,
                    view: item.views,
                    url: item.fileUrl,
                });
            });
        // console.log("리스트", listData);
        // console.log("3");
    };

    let listData = [];
    console.log("2", posts);
    iteration();
    // listData && listData.reverse();

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    return (
        <Fragment>
            <Helmet title="Board" />

            <>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            style={{ borderBottom: "0.1rem solid silver" }}
                            key={item.key}
                            actions={[
                                <IconText
                                    icon={EditOutlined}
                                    text="admin"
                                    key="list-vertical-star-o"
                                />,
                                <IconText
                                    icon={FieldTimeOutlined}
                                    text={item.date}
                                    key="list-vertical-like-o"
                                />,
                                <IconText
                                    icon={EyeOutlined}
                                    text={item.view}
                                    key="list-vertical-message"
                                />,
                            ]}
                            extra={
                                <img height={200} alt="logo" src={item.url} />
                            }
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.avatar} size="large" />
                                }
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </>
        </Fragment>
    );
};

export default PostCardCategorySearched;
