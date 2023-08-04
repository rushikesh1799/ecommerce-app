import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "../../Components/Header/Header";
import "./Products.css";
import ProductFiltersAside from "./Components/ProductFiltersAside/ProductFiltersAside";
import { DataContext } from "../../context/DataProvider";
import { postItemInCart } from "../../Services/Services";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Products = () => {
    const { products, filters, flag, setFlag } = useContext(DataContext);

    const sortByPriceData =
        filters.sortBy === "low-to-high"
            ? [...products].sort((a, b) => a.price - b.price)
            : filters.sortBy === "high-to-low"
            ? [...products].sort((a, b) => b.price - a.price)
            : products;

    const categoryCheckBoxData =
        filters.categories.length > 0
            ? sortByPriceData.filter((item) =>
                  filters.categories.some(
                      (filter) =>
                          filter.toLowerCase() === item.category.toLowerCase()
                  )
              )
            : sortByPriceData;

    const inputSearchedData =
        filters.search.length > 0
            ? categoryCheckBoxData.filter((item) =>
                  item.title
                      .toLowerCase()
                      .includes(filters.search.toLowerCase())
              )
            : categoryCheckBoxData;

    const priceRangeFilteredData =
        filters.priceRange.length > 0
            ? inputSearchedData.filter(
                  (item) => item.price < filters.priceRange
              )
            : inputSearchedData;

    const sizeFilteredData =
        filters.sizes.length > 0
            ? priceRangeFilteredData.filter((item) =>
                  filters.sizes.some((filter) => filter === item.size)
              )
            : priceRangeFilteredData;

    const RatingFilteredData =
        filters.rating !== ""
            ? sizeFilteredData.filter(
                  (item) => item.rating >= Number(filters.rating)
              )
            : sizeFilteredData;

    // console.log("RatingFilteredData", RatingFilteredData);

    // useEffect(() => {
    //     console.log("flag:", flag);
    // }, [flag]);

    return (
        <div>
            <Header />
            <div className="products__page__container">
                <div className="main_filters">
                    <ProductFiltersAside />
                </div>

                <div className="products__right__container">
                    <p>{RatingFilteredData.length} Products Found</p>
                    <div className="productlist-main-cards-container">
                        {RatingFilteredData.map((product) => (
                            <Product product={product} key={product._id} />
                        ))}
                    </div>
                </div>
            </div>
            {flag ? (
                <div className="product-list-drawar product-list-drawar-active">
                    <ProductFiltersAside />
                </div>
            ) : null}

            <div className="productlist-footer-container">
                <div onClick={() => setFlag(true)} className="up_arrow">
                    <KeyboardArrowUpIcon />
                </div>

                <p className="font-wt-semibold filters">Filters</p>
            </div>
        </div>
    );
};

export default Products;
