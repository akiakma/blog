import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
    POST_DETAIL_LOADING_REQUEST,
    POST_DELETE_REQUEST,
    USER_LOADING_REQUEST,
} from "../../redux/types";
import { Row, Col, Container } from "reactstrap";
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
import { Button, Menu, Dropdown } from "antd";
// import { EditOutlined } from "@ant-design/icons";
const PostDetail = req => {
    const dispatch = useDispatch();
    const { postDetail, creatorId, title, loading } = useSelector(
        state => state.post
    );

    const { userId, userName } = useSelector(state => state.auth);
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

    const Body = (
        <>
            <Row className="border-bottom border-top border-black p-3 mb-5 d-flex justify-content-between">
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
                                    {postDetail.title}
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
            </Row>
            {postDetail ? (
                <Fragment>
                    <div className="d-flex justify-content-end align-items-baseline small">
                        &nbsp;
                        <span>{postDetail.date}</span>
                        &nbsp;&nbsp;
                        {/* <span>{postDetail.comments.length}</span> */}
                        &nbsp;&nbsp;
                        <span>{postDetail.views}</span>
                    </div>
                    <Row className="mb-3">
                        <CKEditor
                            editor={BalloonEditor}
                            data={postDetail.contents}
                            config={editorConfiguration}
                            disabled="true"
                        />
                    </Row>
                    <Row>안녕?</Row>
                    {/* <Row>
                        <Container className="mb-3 border border-blue rounded">
                            {Array.isArray(comments)
                                ? comments.map(
                                      ({
                                          contents,
                                          creator,
                                          date,
                                          _id,
                                          creatorName,
                                      }) => (
                                          <div key={_id}>
                                              <Row className="justify-content-between p-2">
                                                  <div className="font-weight-bold">
                                                      {creatorName
                                                          ? creatorName
                                                          : creator}
                                                  </div>
                                                  <div className="text-small">
                                                      {date}
                                                  </div>
                                              </Row>
                                              <Row className="p-2">
                                                  <div>{contents}</div>
                                              </Row>
                                              <hr />
                                          </div>
                                      )
                                  )
                                : "Creator"}
                            <Comments
                                id={req.match.params.id}
                                userId={userId}
                                userName={userName}
                            />
                        </Container>
                    </Row> */}
                </Fragment>
            ) : null}
        </>
    );

    return (
        <div>
            <Helmet title={`Board | ${title}`} />
            {loading === true ? GrowingSpinner : Body}
        </div>
    );
};

export default PostDetail;
