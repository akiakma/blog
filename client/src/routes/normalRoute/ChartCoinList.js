import React, { useCallback } from "react";

const ChartCoinList = ({ data, name }) => {
    const {
        code,
        trade_price,
        change_rate,
        acc_trade_price_24h,
        change,
        change_price,
    } = data;
    // console.log(code);
    // console.log(name);
    const splitedName = code.split("-")[1];
    // console.log(splitedName);
    const changeLiteral = useCallback(change => {
        if (change === "RISE") {
            return "+";
        } else if (change === "FALL") {
            return "-";
        }
        return "";
    }, []);

    const fixPrice = useCallback(price => {
        // 가격 단위 조정 함수
        return parseInt(price.toFixed(0)).toLocaleString();
    }, []);
    const sectionStyle = {
        backgroundImage: `url(https://static.upbit.com/logos/${splitedName}.png)`,
    };
    return (
        <div className="coin_list">
            <div className="coin_list_name">
                <div className="coinImg" style={sectionStyle}></div>
                <div className="coin_list_name_children">
                    <p className="pTagbold">{name}</p>
                    <span className="semiCode">{code}</span>
                </div>
            </div>
            <div className={`coin_list_price ${change}`}>
                <div>{trade_price.toLocaleString()}</div>
            </div>
            <div className={`coin_list_change ${change}`}>
                <p>{`${changeLiteral(change)} ${(change_rate * 100).toFixed(
                    2
                )}%`}</p>
                <span className="semiPrice">{change_price}</span>
            </div>
            <div className="coin_list_volume">
                <div>
                    {parseInt(
                        (acc_trade_price_24h * 0.000001).toFixed(0)
                    ).toLocaleString()}
                    <span>백만</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChartCoinList);
