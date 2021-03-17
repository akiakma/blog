import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import PostCardOne from "../../components/post/PostCardOne";
import { Row } from "reactstrap";
import { PageHeader, Tag } from "antd";
import PostCardCategorySearched from "./PostCardCategorySearched";

const CategoryResult = () => {
    const dispatch = useDispatch();
    let { categoryName } = useParams();
    const { categoryFindResult } = useSelector(state => state.post);

    useEffect(() => {
        dispatch({
            type: CATEGORY_FIND_REQUEST,
            payload: categoryName,
        });
    }, [dispatch, categoryName]);

    return (
        <div className="categoryDiv">
            <Tag>{categoryName}</Tag>

            <PostCardCategorySearched
                posts={
                    Array.isArray(categoryFindResult.posts)
                        ? categoryFindResult.posts
                        : null
                }
            />
            {/* <PostCardOne posts={categoryFindResult.posts} /> */}
        </div>
    );
};

export default CategoryResult;
