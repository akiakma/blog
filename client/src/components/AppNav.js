import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Layout, Menu } from "antd";
import { SettingOutlined, SketchOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import {
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    CLEAR_ERROR_REQUEST,
} from "../redux/types";

import {
    NavLink,
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
import { Badge } from "antd";
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
        // console.log("isAuthenticated", isAuthenticated);
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
        console.log("Appnav:", user);
        dispatch({
            type: LOGIN_REQUEST,
            payload: user,
        });
    };

    let url = useLocation();

    const styler = {
        "ant-menu-item-selected": {
            color: "pink",
        },
    };

    return (
        <Layout>
            <Header style={{ backgroundColor: "black" }} className="header">
                <div className="logo" />
                <Menu
                    className="header-menu"
                    style={{
                        backgroundColor: "black",
                        color: "whitesmoke",
                        fontSize: "1.2rem",
                        borderBottom: "none",
                    }}
                    mode="horizontal"
                    selectedKeys={[url.pathname]}
                >
                    <Menu.Item key="/">
                        <Link style={{ color: "whitesmoke" }} to="/">
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/news">
                        <Link style={{ color: "whitesmoke" }} to="/news">
                            News
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/board">
                        {/* <Badge dot size={"small"}> */}
                        <Link style={{ color: "whitesmoke" }} to="/board">
                            Board
                        </Link>
                        {/* </Badge> */}
                    </Menu.Item>

                    <Menu.Item key="/chart">
                        <Link style={{ color: "whitesmoke" }} to="/chart">
                            Chart
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/attachments">Attachments</Menu.Item>
                    {isAuthenticated ? (
                        <SubMenu
                            key="sub4"
                            icon={<SettingOutlined />}
                            title="Logout"
                        >
                            <Menu.ItemGroup title="settings">
                                <Menu.Item key="setting:1" onClick={removeTokn}>
                                    logout
                                </Menu.Item>
                                <Menu.Item key="setting:2">
                                    <Link to="/post">POST</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    ) : (
                        <SubMenu key="sub4" icon={<SettingOutlined />}>
                            <Menu.ItemGroup title="admin">
                                <Menu.Item
                                    key="setting:1"
                                    onClick={handleToggle}
                                >
                                    connect
                                </Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
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
        </Layout>
    );
};

export default Appnav;
