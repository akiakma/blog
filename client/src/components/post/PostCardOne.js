import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import {
//     Badge,
//     Button,
//     Card,
//     CardBody,
//     CardImg,
//     CardTitle,
//     Row,
// } from "reactstrap";
import { Timeline, Button } from "antd";
const PostCardOne = ({ posts }) => {
    console.log(posts);
    return (
        <div className="postCardOne">
            <div className="postCardOne_main">
                <div className="postCardOne_main_header">
                    <div className="postCardOne_main_header_category">Code</div>
                    <div className="postCardOne_main_header_title">Title</div>
                    <div className="postCardOne_main_header_author">Author</div>
                    <div className="postCardOne_main_header_date">Date</div>
                    <div className="postCardOne_main_header_view">View</div>
                </div>
                {Array.isArray(posts)
                    ? posts.map(posts => {
                          return (
                              <Link to={`/board/post/${posts._id}`}>
                                  <div className="postCardOne_main_body">
                                      <div className="postCardOne_main_body_category">
                                          {posts.category}
                                      </div>
                                      <div className="postCardOne_main_body_title">
                                          {posts.title}
                                      </div>
                                      <div className="postCardOne_main_body_author">
                                          Admin
                                      </div>
                                      <div className="postCardOne_main_body_date">
                                          {posts.date}
                                      </div>
                                      <div className="postCardOne_main_body_view">
                                          {posts.views}
                                      </div>
                                  </div>
                              </Link>
                          );
                      })
                    : null}

                {/* <Timeline
                    pending="work in progress..."
                    reverse={true}
                    className="postCardTimeLine"
                >
                    {/* <Timeline.Item>Create a services site 2015-09-01</Timeline.Item> */}
                {/* {Array.isArray(posts)
                        ? posts.map(post => {
                              return (
                                  <Link
                                      to={`/board/post/${post._id}`}
                                      className="text-dark text-decoration-none"
                                  >
                                      <Timeline.Item>
                                          <strong>{post.title}</strong>
                                          &nbsp;&nbsp;
                                          <span style={{ fontSize: "0.4rem" }}>
                                              {post.date}
                                          </span>
                                      </Timeline.Item>
                                  </Link>
                              );
                          })
                        : null}
                </Timeline> */}
            </div>
        </div>
    );
};

export default PostCardOne;
