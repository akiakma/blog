import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Alert,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    NavLink,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";

const RegisterModal = () => {
    const [modal, setModal] = useState(false);
    const [form, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [localMsg, setLocalMsg] = useState("");
    const { errorMsg } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        });
        setModal(!modal);
    };
    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg]);

    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        const { name, email, password } = form;
        const newUser = { name, email, password };
        console.log(newUser, "newUser");
        dispatch({
            type: REGISTER_REQUEST,
            payload: newUser,
        });
    };
    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Register
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={onChange}
                            />
                            <Label for="name">Email</Label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="name">Password</Label>
                            <Input
                                type="text"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={onChange}
                            />
                            <Button color="dark" className="mt-2" block>
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default RegisterModal;
