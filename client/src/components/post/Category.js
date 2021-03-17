import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";
//

import { Tag } from "antd";
const { CheckableTag } = Tag;

const Category = ({ posts }) => {
    return (
        <div className="categoryDiv">
            <span style={{ marginRight: 8 }}>categories:</span>
            {Array.isArray(posts)
                ? posts.map(tag => (
                      <CheckableTag key={tag._id}>
                          <Link to={`/board/category/${tag.categoryName}`}>
                              {tag.categoryName}
                          </Link>
                      </CheckableTag>
                  ))
                : null}
        </div>
    );
};

export default Category;
