import React, { useCallback } from "react";

const ChartCoinMarketCap = ({ data }) => {
    // console.log("데이타", data);
    const name = data.name + "  " + data.symbol;
    const marketCap = Math.ceil(data.market_cap);
    const img = data.symbol;
    const weekCh = Math.ceil(data.price_change_percentage_7d_in_currency) + "%";
    const monthCh =
        Math.ceil(data.price_change_percentage_30d_in_currency) + "%";
    const yearCh = Math.ceil(data.price_change_percentage_1y_in_currency) + "%";

    const numberToKorean = useCallback(number => {
        var inputNumber = number < 0 ? false : number;
        var unitWords = ["", "만", "억", "조", "경"];
        var splitUnit = 10000;
        var splitCount = unitWords.length;
        var resultArray = [];
        var resultString = "";

        for (var i = 0; i < splitCount; i++) {
            var unitResult =
                (inputNumber % Math.pow(splitUnit, i + 1)) /
                Math.pow(splitUnit, i);
            unitResult = Math.floor(unitResult);
            if (unitResult > 0) {
                resultArray[i] = unitResult;
            }
        }

        for (var i = 0; i < resultArray.length; i++) {
            if (!resultArray[i]) continue;
            resultString =
                String(resultArray[i]) + unitWords[i] + " " + resultString;
        }
        const firstChar = resultString.indexOf("억");
        return resultString.slice(0, firstChar + 1);
    }, []);
    const sectionStyle = {
        backgroundImage: `url(${data.image})`,
    };
    return (
        <div className="marketCap_listItem">
            <div className="marketCap_listItem_order">
                {data.market_cap_rank}
            </div>
            <div className="marketCap_listItem_name">
                <div
                    className="marketCap_listItem_img"
                    style={sectionStyle}
                ></div>
                <div className="marketCap_listItem_symbol">
                    <div className="marketCap_listItem_symbol_child">
                        {name}
                    </div>
                </div>
            </div>

            <div className="marketCap_listItem_7d">{weekCh}</div>
            <div className="marketCap_listItem_30d">{monthCh}</div>
            <div className="marketCap_listItem_1y">{yearCh}</div>
            <div className="marketCap_listItem_MarketCap">
                {numberToKorean(marketCap * 1107.31)}
            </div>
        </div>
    );
};

export default React.memo(ChartCoinMarketCap);
