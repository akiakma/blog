import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinMarketCap, getMarket } from "../../redux/sagas/realtimeSaga";
import ChartCoinList from "./ChartCoinList";
import ChartCoinMarketCap from "./ChartCoinMarketCap";
import Clock from "react-live-clock";
import Marquee from "react-fast-marquee";
const Chart = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getMarket(dispatch);
    }, [dispatch]);
    useEffect(() => {
        coinMarketCap(dispatch);
    }, []);
    const marketData = useSelector(state => state.data.market);
    const realtimeData = useSelector(state => state.data.realtimeData.data);
    const coinMarketCapData = useSelector(state => state.data.marketCap.data);
    const sortedData = useCallback(() => {
        return (
            realtimeData &&
            realtimeData.sort(
                (a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h
            )
        );
    }, [realtimeData]);

    return (
        <>
            {/* <Marquee
                className="marqueeStyle"
                speed="10"
                gradient={false}
                pauseOnHover={true}
            > */}
            <div className="chart-header">
                <h1 className="chart-header-h1">
                    <Clock
                        format={"HH:mm:ss"}
                        interval={1000}
                        ticking={true}
                        timezone={"Asia/Tokyo"}
                    />
                    <div className="chart_header_local">Tokyo</div>
                </h1>
                <h1 className="chart-header-h1">
                    <Clock
                        format={"HH:mm:ss"}
                        interval={1000}
                        ticking={true}
                        timezone={"US/Pacific"}
                    />
                    <div className="chart_header_local">LosAngeles</div>
                </h1>
                <h1 className="chart-header-h1">
                    <Clock
                        format={"HH:mm:ss"}
                        interval={1000}
                        ticking={true}
                        timezone={"America/New_York"}
                    />
                    <div className="chart_header_local">Newyork</div>
                </h1>
                <h1 className="chart-header-h1">
                    <Clock
                        format={"HH:mm:ss"}
                        interval={1000}
                        ticking={true}
                        timezone={"Europe/London"}
                    />
                    <div className="chart_header_local">London</div>
                </h1>
            </div>
            <div className="chart-header-second">
                {" "}
                <h2 className="chart-header-h2">
                    <div>Bitcoin Dominance</div>
                    <div className="chart_header_number">50%</div>
                </h2>
                <h2 className="chart-header-h2" style={{ width: "8rem" }}>
                    <div>Nasdaq</div>
                    <div className="chart_header_number">+3%</div>
                </h2>
                <h2 className="chart-header-h2" style={{ width: "12rem" }}>
                    <div>S&P 500</div>
                    <div className="chart_header_number">+5%</div>
                </h2>
                <h2 className="chart-header-h2" style={{ width: "8rem" }}>
                    <div>Gold</div>
                    <div className="chart_header_number">-1%</div>
                </h2>
                <h2 className="chart-header-h2" style={{ width: "16rem" }}>
                    <div>Dollar Index</div>
                    <div className="chart_header_number">-1.3%</div>
                </h2>
            </div>
            {/* </Marquee> */}
            <div className="chart">
                <div class="chart-Component">
                    <div className="chart_list">
                        <div className="chart_list_head">
                            <div className=" chart_list_name">Name</div>
                            <div className=" chart_list_price">Price</div>
                            <div className=" chart_list_change">Change</div>
                            <div className=" chart_list_volume">Volume</div>
                        </div>
                        <div className="Coins">
                            {sortedData() &&
                                sortedData().map(data => (
                                    <ChartCoinList
                                        key={data.code}
                                        data={data}
                                        name={
                                            marketData.filter(
                                                list =>
                                                    list.market === data.code
                                            )[0].korean_name
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="chart-marketCap">
                    <div className="marketCap_head">
                        <div className="marketCap_order">#</div>
                        <div className="marketCap_name">Name</div>
                        <div className="marketCap_7d">7d</div>
                        <div className="marketCap_30d">30d</div>
                        <div className="marketCap_1y">1y</div>
                        <div className="marketCap_change">Market Cap</div>
                    </div>
                    <div className="marketCap">
                        {coinMarketCapData &&
                            coinMarketCapData.map(data => (
                                <ChartCoinMarketCap key={data.id} data={data} />
                            ))}
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default React.memo(Chart);
