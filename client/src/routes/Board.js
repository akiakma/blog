import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import PostEdit from "./normalRoute/PostEdit";
import CategoryResult from "./normalRoute/CategoryResult";
import Profile from "./normalRoute/Profile";
import {
    EditProtectedRoute,
    ProfileProtectedRoute,
} from "./protectedRoute/ProtectedRoute";
const Board = () => {
    const { Content } = Layout;
    return (
        <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                <Switch>
                    <Route path="/" exact component={PostCardList} />
                    <Route path="/post" exact component={PostWrite} />
                    <Route
                        path="/board/post/:id"
                        exact
                        component={PostDetail}
                    />
                    <EditProtectedRoute
                        path="/post/:id/edit"
                        exact
                        component={PostEdit}
                    />
                    <Route
                        path="/post/category/:categoryName"
                        exact
                        component={CategoryResult}
                    />
                    <Route
                        path="/search/:searchTerm"
                        exact
                        component={Search}
                    />
                    <ProfileProtectedRoute
                        path="/user/:userName/profile"
                        exact
                        component={Profile}
                    />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </Content>
    );
};

export default Board;
