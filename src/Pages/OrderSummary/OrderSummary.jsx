import React, { useContext } from "react";
import Header from "../../Components/Header/Header";
import { DataContext } from "../../context/DataProvider";
import Product from "../../Components/Product/Product";

import "./OrderSummary.css";
import { NavLink } from "react-router-dom";

const OrderSummary = () => {
    const { orderObj } = useContext(DataContext);
    const { addressToDeliver, boughtItems, totalOrderValue } = orderObj;
    return (
        <div>
            <Header />
            <h2>Order Summary</h2>
            <p>Thank you for placing your order</p>
            <div className="orderSummary_container">
                <div className="productlist-main-cards-container">
                    {boughtItems.map((product) => (
                        <Product product={product} />
                    ))}
                </div>
                <div className="orderSummary_text">
                    <div>
                        <b>Delivery Address: </b>
                        <span>
                            {addressToDeliver.address_line_1 +
                                " " +
                                addressToDeliver.address_line_2 +
                                ", " +
                                addressToDeliver.city +
                                " - " +
                                addressToDeliver.pincode +
                                ", " +
                                addressToDeliver.state +
                                "."}
                        </span>
                    </div>
                    <div>
                        <b>Total Amount Paid: </b>
                        <span>{totalOrderValue}</span>
                    </div>
                </div>
            </div>
            <NavLink to="/products">Shop More!</NavLink>
        </div>
    );
};

export default OrderSummary;
