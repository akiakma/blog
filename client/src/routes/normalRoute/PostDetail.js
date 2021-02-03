import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-helmet";
import {
    POST_DELETE_REQUEST,
    POST_DETAIL_LOADING_REQUEST,
    USER_LOADING_REQUEST,
} from "../../redux/types";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import helmet from "helmet";

const PostDetail = req => {
    //
    const dispatch = useDispatch();
    const { postDetail, creatorId, title, loading } = useSelector(
        state => state.post
    );
    const { userId, userName } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch({
            type: POST_DETAIL_LOADING_REQUEST,
            payload: req.match.params.id,
        });
        dispatch({
            type: USER_LOADING_REQUEST,
            payload: localStorage.getItem("token"),
        });
    }, []);

    const onDeleteClick = () => {
        dispatch({
            type: POST_DELETE_REQUEST,
            payload: {
                id: req.match.params.id,
                token: localStorage.getItem("token"),
            },
        });
    };

    const EditButton = (
        <>
            <Row className="d-flex justify-content-center pb-3">
                <Col className="col-md-3 mr-md-3">
                    <Link to="/" className="btn btn-primary btn-block">
                        Home
                    </Link>
                </Col>
                <Col className="col-md-3 mr-md-3">
                    <Link
                        to={`/post/${req.match.params.id}/edit`}
                        className="btn btn-success btn-block"
                    >
                        Edit
                    </Link>
                </Col>
                <Col className="col-md-3">
                    <Button
                        className="btn-block btn-danger"
                        onClick={onDeleteClick}
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
        </>
    );

    const HomeButton = (
        <>
            <Row className="d-flex justify-content-center pb-3">
                <Col className="col-sm-12 com-md-3">
                    <Link to="/" className="btn btn-primary btn-block">
                        Home
                    </Link>
                </Col>
            </Row>
        </>
    );
    const Body = <>{userId === creatorId ? EditButton : HomeButton}</>;
    console.log("title", title);
    return <h1>hello</h1>;
};

export default PostDetail;
