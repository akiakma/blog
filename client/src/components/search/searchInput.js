import React, { useState, useRef, Fragment } from "react";
// import { Form, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { SEARCH_REQUEST } from "../../redux/types";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Form } from "reactstrap";

const SearchInput = () => {
    const resetValue = useRef(null);
    const dispatch = useDispatch();
    const [form, setValues] = useState({ searchBy: "" });

    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
        // console.log(form);
    };
    const onSubmit = async e => {
        await e.preventDefault();
        const { searchBy } = form;

        dispatch({
            type: SEARCH_REQUEST,
            payload: searchBy,
        });

        // console.log(searchBy, "Submit Body1");
        // resetValue.current.value = "";
    };

    const { Search } = Input;
    // const resetValue = useRef(null);

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: "#1890ff",
            }}
        />
    );

    const onSearch = value => console.log(value);
    return (
        <Fragment>
            {/* <Space direction="vertical">
                <Search
                    name="searchBy"
                    onSubmit={onSubmit}
                    placeholder=""
                    onChange={onChange}
                    onSearch={onSearch}
                    innerRef={resetValue}
                    style={{ width: 200 }}
                />
            </Space> */}
            <Form onSubmit={onSubmit}>
                <Input
                    name="searchBy"
                    onSubmit={onSubmit}
                    placeholder=""
                    onChange={onChange}
                    onSearch={onSearch}
                    innerRef={resetValue}
                />
            </Form>
        </Fragment>
    );
};

export default SearchInput;
