import React from "react";
import { Spin, Alert } from "antd";
const LoadingSpinner = () => {
    return (
        <div className="LoadingSpinner">
            <Spin size={"large"} />
        </div>
    );
};

export default LoadingSpinner;
