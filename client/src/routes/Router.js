import React, { useEffect, useState } from "react";
import FooterComponent from "../components/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./normalRoute/Home";
import News from "./normalRoute/News";
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
import { Layout, Breadcrumb } from "antd";

import { useSelector } from "react-redux";

import Appnav from "../components/AppNav";
import NewsWrite from "./normalRoute/NewsWrite";

const MyRouter = () => {
    const { Content } = Layout;
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        setIsOpen(false);
    }, [user]);

    return (
        <Switch>
            <Layout className="layout">
                <Appnav />
                <Content style={{ padding: "30px 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
                    <div className="site-layout-content">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/news" exact component={News} />
                            <Route path="/post" exact component={PostWrite} />
                            <Route
                                path="/postNews"
                                exact
                                component={NewsWrite}
                            />
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
