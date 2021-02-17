import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import PostCardOne from "../../components/post/PostCardOne";
import { Row } from "reactstrap";
import { PageHeader } from "antd";

const CategoryResult = () => {
    const dispatch = useDispatch();
    let { categoryName } = useParams();
    const { categoryFindResult } = useSelector(state => state.post);

    // console.log(categoryFindResult);
    // console.log(categoryName);

    useEffect(() => {
        dispatch({
            type: CATEGORY_FIND_REQUEST,
            payload: categoryName,
        });
    }, [dispatch, categoryName]);

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Category"
                subTitle={categoryName}
            />

            <Row>
                <PostCardOne posts={categoryFindResult.posts} />
            </Row>
        </div>
    );
};

export default CategoryResult;
