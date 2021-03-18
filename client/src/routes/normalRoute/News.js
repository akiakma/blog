import React, { useCallback, useEffect, useState } from "react";
import {
    Input,
    Divider,
    Button,
    Upload,
    Image,
    Comment,
    Tooltip,
    Avatar,
    Row,
    Col,
    message,
    Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import dotenv from "dotenv";
import axios from "axios";
import {
    BADGE_UPLOADING_SUCCESS,
    NEWS_DELETE_REQUEST,
    NEWS_LOADING_REQUEST,
    NEWS_UPLOADING_REQUEST,
} from "../../redux/types";
import moment from "moment";
import { Helmet } from "react-helmet";
dotenv.config();
const News = () => {
    const { errorMsg, isAuthenticated } = useSelector(state => state.auth);
    const [loginStatus, SetLoginStatus] = useState(false);
    useEffect(() => {
        SetLoginStatus(isAuthenticated);
    }, [isAuthenticated]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [valueId, setValueId] = useState("");

    const [form, setValues] = useState({
        title: "",
        contents: "",
        fileUrl: "",
    });
    const dispatch = useDispatch();
    const error = () => {
        message.error({
            content: " 로그인이 필요합니다 🙅🏻‍♂️ ",
            className: "custom-class",
            style: {
                marginTop: "20vh",
            },
        });
    };
    const onSubmit = async e => {
        await e.preventDefault();
        if (isAuthenticated === true) {
            const { title, contents, fileUrl } = form;
            const token = localStorage.getItem("token");
            const body = { title, contents, fileUrl, token };
            dispatch({
                type: NEWS_UPLOADING_REQUEST,
                payload: body,
            });
        }
        if (isAuthenticated === false) {
            error();
        }
    };
    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const { TextArea } = Input;
    useEffect(() => {
        dispatch({ type: NEWS_LOADING_REQUEST });
        console.log("loadingrequest");
    }, []);
    //upload
    const props = {
        action(file) {
            const data = new FormData();
            data.append("upload", file);

            return axios
                .post(
                    `${process.env.REACT_APP_BASIC_SERVER_URL}/api/news/image`,
                    data
                )
                .then(res => {
                    setValues({ ...form, fileUrl: res.data.url[0] });
                    console.log(res.data.url[0]);
                })
                .catch(err => {
                    alert("실패");
                });
        },
        listType: "picture",
    };

    //loading

    const newsList = useSelector(state => state.news);

    //트위터 리스트 나열(map)
    const renderGet = useCallback(() => {
        return Array.isArray(newsList.news)
            ? newsList.news
                  .map(item => (
                      <>
                          <NewsDetail
                              key={item._id}
                              params={item._id}
                              content={item.contents}
                              date={item.date}
                              url={item.fileUrl}
                          />
                          <Divider></Divider>
                      </>
                  ))
                  .reverse()
            : null;
    }, [newsList]);

    const NewsDetail = ({ params, content, date, url }) => {
        function confirm() {
            dispatch({
                type: NEWS_DELETE_REQUEST,
                payload: {
                    id: params,
                    token: localStorage.getItem("token"),
                },
            });

            message.success("삭제되었습니다.");
        }
        function cancel(e) {
            console.log(e);
            message.error("Click on No");
        }
        // console.log("날짜", date);
        const result = date.split("-");
        const willchange = Number(result[1]) - 1;
        const changed = String(willchange);
        result[1] = changed;

        return (
            <>
                <Comment
                    author={
                        <>
                            <strong style={{ fontSize: "1rem" }}>
                                hyunjun&nbsp; &nbsp;
                            </strong>
                            <span>
                                {isAuthenticated ? (
                                    <Popconfirm
                                        title="Are you sure to delete this task?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <a href="#">Delete</a>
                                    </Popconfirm>
                                ) : null}
                            </span>
                            <Tooltip title={"akiakma@instagram"}>
                                <span>@akiakma</span>
                            </Tooltip>
                        </>
                    }
                    avatar={
                        <Avatar
                            src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-256.png"
                            alt="avatar"
                        />
                    }
                    content={<p style={{ marginTop: "0.5rem" }}>{content}</p>}
                    datetime={
                        <>
                            <Tooltip
                                title={moment(result).format(
                                    "YYYY-MM-DD-HH:mm"
                                )}
                            >
                                <span>{moment(result).fromNow()}</span>
                            </Tooltip>
                        </>
                    }
                />
                <div style={{ marginLeft: "3rem" }}>
                    <ImageURL url={url} />
                </div>
            </>
        );
    };
    const ImageURL = ({ url }) => {
        return url === null ? <></> : <Image width={250} src={url} />;
    };
    //badge
    const [badge, setBadge] = useState(0);
    useEffect(() => {
        loadNewsAPI().then(item => {
            const data = item.data.newsFindeResult;
            const filtering = data.filter(item => {
                const newsDate = moment(item.date.split("-")).format(
                    "YYYYMMDD"
                );
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
    return (
        <Row>
            <Helmet title="News | 블로그" />

            <Col xs={4} md={7}></Col>
            <Col xs={14} md={10}>
                {
                    <>
                        <Divider>
                            <FormOutlined />
                        </Divider>
                        <div>
                            <TextArea
                                name="contents"
                                showCount
                                maxLength={600}
                                bordered={false}
                                placeholder="오늘 하루를 들려주세요."
                                onChange={onChange}
                            />
                        </div>
                        <Button icon={<EditOutlined />} onClick={onSubmit}>
                            Submit
                        </Button>
                        {isAuthenticated ? (
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>
                                    Upload
                                </Button>
                            </Upload>
                        ) : (
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                disabled
                            >
                                Upload(disabled)
                            </Button>
                        )}
                    </>
                }

                <Divider>담벼락</Divider>
                <div>{renderGet()}</div>
            </Col>
            <Col xs={4} md={7}></Col>
        </Row>
    );
};

export default News;
