import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Layout, Menu, Badge } from "antd";
import {
    SettingOutlined,
    CommentOutlined,
    MessageFilled,
    HomeOutlined,
    HomeFilled,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import {
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    CLEAR_ERROR_REQUEST,
} from "../redux/types";

import {
    Modal,
    ModalHeader,
    ModalBody,
    Alert,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import SearchInput from "./search/searchInput";

const Appnav = req => {
    const { SubMenu } = Menu;

    const dispatch = useDispatch();

    const { Header, Content, Footer } = Layout;
    //
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState("");
    const [form, setValues] = useState({
        email: "",
        password: "",
    });
    const { errorMsg, isAuthenticated } = useSelector(state => state.auth);
    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg]);

    useEffect(() => {
        if (isAuthenticated) {
            setModal(false);
        }
    }, [isAuthenticated]);

    const removeTokn = () => {
        dispatch({
            type: LOGOUT_REQUEST,
        });
    };

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        });
        setModal(!modal);
    };

    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = form;
        const user = { email, password };
        dispatch({
            type: LOGIN_REQUEST,
            payload: user,
        });
    };
    let url = useLocation();

    // here's for badge count
    const newFeed = useSelector(state => state.badge.count);
    return (
        <div>
            <Header
                style={{
                    backgroundColor: "white",
                    position: "fixed",
                    zIndex: "100",
                }}
                className="header"
            >
                <Menu
                    className="header-menu"
                    style={{
                        backgroundColor: "white",
                        color: "black",
                        fontSize: "1rem",
                        border: "none",
                    }}
                    mode="horizontal"
                    selectedKeys={[url.pathname]}
                >
                    <Menu.Item style={{ borderBottom: "none" }} key="/">
                        <Link
                            style={{
                                color: "black",
                            }}
                            to="/"
                        >
                            {url.pathname === "/" ? (
                                <HomeFilled />
                            ) : (
                                <HomeOutlined />
                            )}
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item style={{ borderBottom: "none" }} key="/news">
                        <Link style={{ color: "black" }} to="/news">
                            {url.pathname === "/news" ? (
                                <MessageFilled />
                            ) : (
                                <CommentOutlined />
                            )}
                            News
                            <Badge
                                style={{ marginBottom: "1rem" }}
                                count={newFeed}
                                overflowCount={99}
                                size={"small"}
                            ></Badge>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <div>
                            <SearchInput />
                        </div>
                    </Menu.Item>
                    {isAuthenticated ? (
                        <SubMenu
                            key="sub4"
                            icon={<SettingOutlined />}
                            title="Logout"
                        >
                            <Menu.ItemGroup title="settings">
                                <Menu.Item key="setting:1" onClick={removeTokn}>
                                    LOGOUT
                                </Menu.Item>
                                <Menu.Item key="setting:2">
                                    <Link to="/post">POST</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    ) : (
                        <SubMenu
                            style={{ borderBottom: "none" }}
                            key="sub4"
                            icon={<SettingOutlined />}
                        >
                            <Menu.ItemGroup title="admin">
                                <Menu.Item
                                    key="setting:1"
                                    onClick={handleToggle}
                                >
                                    connect
                                </Menu.Item>
                                <Menu.Item key="setting:2" disabled>
                                    test
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    )}
                </Menu>
            </Header>
            {/*Login Modal */}
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}> Login</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={onChange}
                            />
                            <Button
                                color="light"
                                style={{ marginTop: "2rem" }}
                                block
                            >
                                CONNECT
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Appnav;
