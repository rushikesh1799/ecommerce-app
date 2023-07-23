import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { DataContext } from "../../context/DataProvider";
import { ReactToastify } from "../../Utility/ReactTostify";

import "./Checkout.css";
import Button from "@mui/material/Button";
import CreateNewAddressModal from "../UserProfile/CreateNewAddress/CreateNewAddressModal";
import { useNavigate } from "react-router-dom";
import { deleteItemInCart } from "../../Services/Services";
import { AuthContext } from "../../context/AuthContext";

const Checkout = () => {
    const navigate = useNavigate();

    const { token } = useContext(AuthContext);

    const {
        cartlist,
        totalCartValue,
        addresses,
        selectedAddress,
        setSelectedAddress,
        orderObj,
        dispatch,
    } = useContext(DataContext);

    useEffect(() => {
        console.log("orderObj", orderObj);
    }, [orderObj]);
    // useEffect(() => {
    //     console.log("selectedAddress", selectedAddress);
    // }, [selectedAddress]);

    useEffect(() => {
        dispatch({
            type: "SET_ORDER_OBJ",
            payload: {
                selectedAddress: selectedAddress,
                currentCartItems: [...cartlist],
                totalOrderValue: totalCartValue.toFixed(2) - 40 + 20,
            },
        });
    }, [selectedAddress, cartlist]);

    const clearCart = async (item, token) => {
        try {
            const res = await deleteItemInCart({
                product: item,
                encodedToken: token,
            });
            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const removeAllCartItems = () => {
        let cart = null;
        cartlist.forEach((element) => {
            cart = clearCart(element, token);
        });
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            ReactToastify("Please select the address", "info");
        } else {
            navigate("/order-summary");
            dispatch({
                type: "ORDER_PLACED",
                payload: { cartlist: [], currentOrder: orderObj },
            });
            setSelectedAddress();
            removeAllCartItems();
            console.log("Order Placed");
        }
    };

    const isAddressSelected = (address) => selectedAddress?.id === address?.id;
    // console.log(isAddressSelected({ id: 2 }));
    return (
        <div>
            <Header />

            <div className="checkout_container">
                <div className="address_details">
                    <h2>Address Details</h2>
                    {addresses &&
                        addresses.map((address) => (
                            <div
                                key={address.id}
                                className="address_card"
                                onClick={() => setSelectedAddress(address)}
                            >
                                <div>
                                    <input
                                        type="radio"
                                        name="address-radio"
                                        checked={isAddressSelected(address)}
                                        readOnly
                                        id={address.id}
                                    />
                                </div>

                                <label htmlFor={address.id}>
                                    <p>
                                        {address.address_line_1 +
                                            ", " +
                                            address.address_line_2}
                                    </p>

                                    <p>
                                        {address.city +
                                            " - " +
                                            address.pincode +
                                            ", " +
                                            address.state}
                                    </p>
                                </label>
                            </div>
                        ))}
                    <div className="checkout_add_address">
                        <CreateNewAddressModal />
                    </div>
                </div>
                <div className="price_details">
                    <h2 className="cart__price__details__title">
                        Price Details
                    </h2>
                    <hr />
                    <div className="checkout_item">
                        <p>Price ({cartlist.length})</p>
                        <p>{totalCartValue.toFixed(2)}</p>
                    </div>
                    <div className="checkout_item">
                        <p>Discount</p>
                        <p>-40</p>
                    </div>
                    <div className="checkout_item">
                        <p>Delivery Charges</p>
                        <p>20</p>
                    </div>
                    <hr />
                    <div className="checkout_item">
                        <p>Total Price</p>
                        <p>{totalCartValue.toFixed(2) - 40 + 20}</p>
                    </div>

                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            width: "100%",
                            color: "#FFF",
                            backgroundColor: "black",
                            ":hover": {
                                color: "#FFF",
                                backgroundColor: "#3b82f6",
                            },
                        }}
                    >
                        <span
                            className="btn_content"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
