import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BADGE_UPLOADING_SUCCESS,
    POSTS_LOADING_REQUEST,
} from "../../redux/types";
import { Helmet } from "react-helmet";
import moment from "moment";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { List, Avatar, Space, Row, Col } from "antd";
import {
    EditOutlined,
    FieldTimeOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import axios from "axios";
const Home = () => {
    const [badge, setBadge] = useState(0);
    useEffect(() => {
        loadNewsAPI().then(item => {
            const data = item.data.newsFindeResult;
            const filtering = data.filter(item => {
                const newsDate = moment(item.date.split("-")).format(
                    "YYYYMMDD"
                );
                console.log("newDate", newsDate);
                const nowDate = moment().format("YYYYMMDD");
                // console.log("newsDate", newsDate);
                // console.log("nowDate", nowDate);
                return nowDate - newsDate === -100;
                //  item.date === "2021-03-17-18-30";
            });
            dispatch({
                type: BADGE_UPLOADING_SUCCESS,
                payload: filtering.length,
            });
        });
    }, [badge]);

    const loadNewsAPI = () => {
        return axios.get("/api/news");
    };
    const iteration = () => {
        return Array.isArray(posts)
            ? posts &&
                  posts.map((item, index) => {
                      listData.push({
                          href: `/board/post/${item._id}`,
                          title: item.title,
                          avatar:
                              "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
                          description: "↑ click to read this article",
                          content:
                              item.contents
                                  .replace(/(<([^>]+)>)/gi, "")
                                  .replace(/&nbsp;/gi, "")
                                  .substring(0, 50) + " ..",
                          date: item.date,
                          view: item.views,
                          url: item.fileUrl,
                          index: index,
                      });
                  })
            : null;
    };
    const { posts, categoryFindResult } = useSelector(state => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: POSTS_LOADING_REQUEST });
    }, [dispatch]);

    const listData = [];

    iteration();
    listData && listData.reverse();

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    return (
        <Row>
            <Col span={4}>
                <Helmet title="Home | 블로그" />
            </Col>
            <Col span={16}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    dataSource={listData}
                    header={
                        <div>
                            {Array.isArray(categoryFindResult)
                                ? categoryFindResult &&
                                  categoryFindResult.map(item => {
                                      return (
                                          <Tag>
                                              <Link
                                                  to={`/board/category/${item.categoryName}`}
                                              >
                                                  {item.categoryName}
                                              </Link>
                                          </Tag>
                                      );
                                  })
                                : null}
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            style={{ borderBottom: "0.1rem solid silver" }}
                            key={item.title}
                            actions={[
                                <IconText
                                    icon={EditOutlined}
                                    text="현준"
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
                                <img
                                    height={100}
                                    width={100}
                                    alt="logo"
                                    src={item.url}
                                />
                            }
                        >
                            <List.Item.Meta
                                // avatar={
                                //     <Avatar src={item.avatar} size="large" />
                                // }
                                title={
                                    <a href={item.href}>
                                        <strong>{item.index + 1}. </strong>
                                        {item.title}
                                    </a>
                                }
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </Col>
            <Col span={4}></Col>
        </Row>
    );
};

export default Home;
