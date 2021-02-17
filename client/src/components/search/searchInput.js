import React, { useState, useRef, Fragment } from "react";
// import { Form, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { SEARCH_REQUEST } from "../../redux/types";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const SearchInput = () => {
    const dispatch = useDispatch();
    const [form, setValues] = useState({ searchBy: "" });

    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(form);
    };

    const onSubmit = async e => {
        await e.preventDefault();
        const { searchBy } = form;

        dispatch({
            type: SEARCH_REQUEST,
            payload: searchBy,
        });

        console.log(searchBy, "Submit Body");
        resetValue.current.value = "";
    };
    const resetValue = useRef(null);

    const { Search } = Input;

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
            <Space direction="vertical">
                <Search
                    placeholder=""
                    onSearch={onSearch}
                    style={{ width: 100 }}
                />
            </Space>
            {/* <Form onSubmit={onSubmit}>
                <Input
                    name="searchBy"
                    onChange={onChange}
                    innerRef={resetValue}
                />
            </Form> */}
        </Fragment>
    );
};

export default SearchInput;
