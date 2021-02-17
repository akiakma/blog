import React, { Fragment, useCallback, useEffect, useState } from "react";
// import Header from "../components/Header";
import FooterComponent from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
// import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import PostEdit from "./normalRoute/PostEdit";
import CategoryResult from "./normalRoute/CategoryResult";
import Profile from "./normalRoute/Profile";
import Home from "./normalRoute/Home";
import {
    EditProtectedRoute,
    ProfileProtectedRoute,
} from "./protectedRoute/ProtectedRoute";
import { Layout, Menu, Breadcrumb, Tag } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { GET_REAL_TIME_DATA_REQUEST, LOGOUT_REQUEST } from "../redux/types";

import Appnav from "../components/AppNav";
import News from "./normalRoute/News";
import Chart from "./normalRoute/Chart";

const MyRouter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_REAL_TIME_DATA_REQUEST,
        });
    }, []);

    const { Content, Footer } = Layout;
    //
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    // console.log(userRole, "UserRole");

    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST,
        });
    }, [dispatch]);

    useEffect(() => {
        setIsOpen(false);
    }, [user]);

    return (
        <Switch>
            <Layout className="layout" style={{ backgroundColor: "black" }}>
                <Appnav />
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
                    <div className="site-layout-content">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/news" exact component={News} />
                            <Route
                                path="/board"
                                exact
                                component={PostCardList}
                            />
                            <Route path="/chart" exact component={Chart} />
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
                                path="/board/category/:categoryName"
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
                <FooterComponent />
            </Layout>
        </Switch>
    );
};

export default MyRouter;
