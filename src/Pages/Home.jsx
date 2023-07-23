import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";
import Categories from "../Components/Categories/Categories";
import { ProductContext } from "../context/ProductProvider";
import Footer from "../Components/Footer/Footer";

const Home = () => {
    const token = JSON.parse(localStorage.getItem("UserDetails"))?.encodedToken;

    // useEffect(() => {
    //     console.log(books);
    // }, [books]);

    return (
        <div>
            <Header />
            <Banner />
            <Categories />
            <Footer />
        </div>
    );
};

export default Home;

// login form create kar
// take details in cred variables state
