import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Row,
} from "reactstrap";

const PostCardOne = ({ posts }) => {
    // const clickme = () => {
    //     e.preventDefault();
    //     console.log(posts._id);
    // };
    return (
        <>
            {Array.isArray(posts)
                ? posts.map(({ _id, title, fileUrl, comments, views }) => {
                      return (
                          <div key={_id} className="col-md-4">
                              <Link
                                  to={`/post/${_id}`}
                                  className="text-dark text-decoration-none"
                              >
                                  <Card className="mb-3">
                                      <CardImg
                                          top
                                          alt="카드이미지"
                                          src={fileUrl}
                                          //   onClick={clickme(posts)}
                                      />
                                      <CardBody>
                                          <CardTitle className="text-truncate d-flex justify-content-between">
                                              <span className="text-truncate">
                                                  {title}
                                              </span>
                                              <span>
                                                  <FontAwesomeIcon
                                                      icon={faMouse}
                                                  />
                                                  &nbsp;&nbsp;
                                                  <span>{views}</span>
                                              </span>
                                          </CardTitle>
                                          <Row>
                                              <Button
                                                  color="primary"
                                                  className="p-2 btn-block"
                                              >
                                                  More
                                                  <Badge color="light">
                                                      {comments.length}
                                                  </Badge>
                                              </Button>
                                          </Row>
                                      </CardBody>
                                  </Card>
                              </Link>
                          </div>
                      );
                  })
                : null}
        </>
    );
};

export default PostCardOne;
