import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";

const PostCardList = () => {
    const { posts, categoryFindResult } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: POSTS_LOADING_REQUEST });
    }, [dispatch]);

    return (
        <Fragment>
            <Helmet title="Board" />
            <Row className="py-2 mb-3">
                <Category posts={categoryFindResult} />
            </Row>
            <Row>
                {posts ? <PostCardOne posts={posts} /> : <LoadingSpinner />}
            </Row>
        </Fragment>
    );
};

export default PostCardList;
