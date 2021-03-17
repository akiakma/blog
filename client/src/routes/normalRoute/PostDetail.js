import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
    POST_DETAIL_LOADING_REQUEST,
    POST_DELETE_REQUEST,
    USER_LOADING_REQUEST,
} from "../../redux/types";
// import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import GrowingSpinner from "../../components/spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencilAlt,
    faCommentDots,
    faMouse,
} from "@fortawesome/free-solid-svg-icons";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Comments from "../../components/comments/Comments";
import {
    Button,
    Menu,
    Dropdown,
    PageHeader,
    Descriptions,
    Row,
    Col,
    Divider,
    Tag,
    Popconfirm,
    message,
    Skeleton,
} from "antd";
// import { EditOutlined } from "@ant-design/icons";
const PostDetail = req => {
    console.log("정답은?", req);
    const dispatch = useDispatch();
    const { postDetail, creatorId, title, loading } = useSelector(
        state => state.post
    );

    const { userId, userName, isAuthenticated } = useSelector(
        state => state.auth
    );

    const { comments } = useSelector(state => state.comment);
    useEffect(() => {
        dispatch({
            type: POST_DETAIL_LOADING_REQUEST,
            payload: req.match.params.id,
        });
        dispatch({
            type: USER_LOADING_REQUEST,
            payload: localStorage.getItem("token"),
        });
    }, [dispatch, req.match.params.id]);

    const onDeleteClick = () => {
        dispatch({
            type: POST_DELETE_REQUEST,
            payload: {
                id: req.match.params.id,
                token: localStorage.getItem("token"),
            },
        });
    };
    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to={`/post/${req.match.params.id}/edit`}>Edit</Link>
            </Menu.Item>
            <Menu.Item key="2" onClick={onDeleteClick}>
                Delete
            </Menu.Item>
        </Menu>
    );

    function confirmDelete() {
        if (isAuthenticated === false) {
            message.error("require permission");
        } else {
            onDeleteClick();
            message.success("삭제되었습니다.");
        }
    }
    function cancelDelete(e) {
        console.log(e);
        message.error("Click on No");
    }
    const Body = (
        <>
            <Helmet title={`글 | ${title}`} />
            {/* <Row className="border-bottom border-top border-black p-3 mb-5 d-flex justify-content-between">
                {(() => {
                    if (postDetail && postDetail.creator) {
                        return (
                            <Fragment>
                                <div className="font-weight-bold text-big">
                                    <span className="mr-3">
                                        <button disabled>
                                            {postDetail.category.categoryName}
                                        </button>
                                    </span>
                                    <span>{postDetail.title}</span>
                                </div>
                                <div className="align-self-end">
                                    <Dropdown.Button overlay={menu}>
                                        <strong>
                                            {postDetail.creator.name}
                                        </strong>
                                    </Dropdown.Button>
                                </div>
                            </Fragment>
                        );
                    }
                })()}
            </Row> */}

            {postDetail ? (
                <>
                    <Row>
                        <Col>
                            <div>
                                <PageHeader
                                    ghost={true}
                                    onBack={() => window.history.back()}
                                    title={postDetail.title}
                                    extra={[
                                        <Link
                                            to={`/post/${req.match.params.id}/edit`}
                                        >
                                            Edit
                                        </Link>,
                                        <Popconfirm
                                            title="Are you sure to delete this task?"
                                            onConfirm={confirmDelete}
                                            onCancel={cancelDelete}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <a href="#">Delete</a>
                                        </Popconfirm>,
                                    ]}
                                >
                                    <Descriptions size="small" column={3}>
                                        <Descriptions.Item label="Created">
                                            Hyunjun Kim
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Code">
                                            <a>{postDetail._id}</a>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Creation Time">
                                            {postDetail.date}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Views">
                                            {postDetail.views}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Tag">
                                            <Tag color="magenta">
                                                {
                                                    postDetail.category
                                                        .categoryName
                                                }
                                            </Tag>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </PageHeader>
                            </div>
                            <Divider>본문</Divider>
                            <Row
                                style={{
                                    backgroundColor: "#F0F2F5",
                                    width: "100vw",
                                    height: "100vh",
                                    overflow: "auto",
                                }}
                            >
                                <CKEditor
                                    editor={BalloonEditor}
                                    data={postDetail.contents}
                                    config={editorConfiguration}
                                    disabled="true"
                                />
                            </Row>
                        </Col>
                    </Row>
                </>
            ) : null}
        </>
    );

    return (
        // <div>
        //     {loading === true ? GrowingSpinner : Body}
        // </div>

        <>
            {loading === true ? (
                <div style={{ height: "60rem" }}>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            ) : (
                Body
            )}
        </>
    );
};

export default PostDetail;
