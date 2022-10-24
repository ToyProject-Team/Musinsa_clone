import React, { useCallback, useState } from 'react';
import { List } from './styles';
import { ReactComponent as BasketIcon } from 'assets/svg/Basket.svg';

const NoticeList = ({ item }) => {
    function timeForToday(value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    return (
        <List>
            <div>
                <ul>
                    <li className="item-list">
                        <div className="basket">
                            <BasketIcon />
                        </div>
                        <div className="infomation">
                            <div className="infomation_header">
                                <h4> 주문 완료 </h4>
                                <p>
                                    주문({item.createdAt.slice(0, 10).replaceAll('-', '')}
                                    {item.MerchantUid.replace('mid_', '')})이 완료되었습니다.
                                </p>
                                <label>{timeForToday(item.createdAt)}</label>
                            </div>
                            <div className="infomation_image">
                                <img src="https://image.msscdn.net/images/goods_img/20220811/2711411/2711411_13_62.jpg" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </List>
    );
};

export default NoticeList;
