import React, { useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Header from "../../Components/Header/Header";
import "./Products.css";
import ProductFiltersAside from "./Components/ProductFiltersAside/ProductFiltersAside";
import { DataContext } from "../../context/DataProvider";
import { postItemInCart } from "../../Services/Services";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";

// const products = [
//     // Mens Data

//     {
//         _id: uuid(),
//         title: "Men's T-Shirt",
//         description: "A comfortable and stylish t-shirt for men",
//         price: 20.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.5,
//         image: "https://example.com/images/mens-tshirt.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Hoodie",
//         description: "A warm and cozy hoodie for men",
//         price: 39.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.2,
//         image: "https://example.com/images/mens-hoodie.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Jeans",
//         description: "Classic denim jeans for men",
//         price: 49.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.8,
//         image: "https://example.com/images/mens-jeans.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Polo Shirt",
//         description: "A stylish polo shirt for men",
//         price: 29.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.6,
//         image: "https://example.com/images/mens-polo-shirt.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Dress Shirt",
//         description: "A formal dress shirt for men",
//         price: 59.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.3,
//         image: "https://example.com/images/mens-dress-shirt.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Shorts",
//         description: "Casual and comfortable shorts for men",
//         price: 24.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.7,
//         image: "https://example.com/images/mens-shorts.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Blazer",
//         description: "A stylish blazer for men",
//         price: 79.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.1,
//         image: "https://example.com/images/mens-blazer.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Sweatpants",
//         description: "Comfortable sweatpants for men",
//         price: 34.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.4,
//         image: "https://example.com/images/mens-sweatpants.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Winter Jacket",
//         description: "A warm winter jacket for men",
//         price: 99.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.9,
//         image: "https://example.com/images/mens-winter-jacket.jpg",
//         category: "Men's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Men's Socks",
//         description: "Comfortable and breathable socks for men",
//         price: 9.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL", "XXL"],
//         rating: 4.0,
//         image: "https://example.com/images/mens-socks.jpg",
//         category: "Men's Clothing",
//     },

//     // Women's data

//     {
//         _id: uuid(),
//         title: "Women's Dress",
//         description: "A beautiful and elegant dress for women",
//         price: 59.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.5,
//         image: "https://example.com/images/womens-dress.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's Blouse",
//         description: "A stylish blouse for women",
//         price: 29.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.2,
//         image: "https://example.com/images/womens-blouse.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's Jeans",
//         description: "Trendy denim jeans for women",
//         price: 49.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.8,
//         image: "https://example.com/images/womens-jeans.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's T-Shirt",
//         description: "A comfortable t-shirt for women",
//         price: 19.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.6,
//         image: "https://example.com/images/womens-tshirt.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's Skirt",
//         description: "A stylish skirt for women",
//         price: 39.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.3,
//         image: "https://example.com/images/womens-skirt.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's Sweater",
//         description: "A cozy sweater for women",
//         price: 44.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.7,
//         image: "https://example.com/images/womens-sweater.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's Coat",
//         description: "A warm coat for women",
//         price: 89.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.1,
//         image: "https://example.com/images/womens-coat.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's Leggings",
//         description: "Comfortable leggings for women",
//         price: 24.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.4,
//         image: "https://example.com/images/womens-leggings.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's Jumpsuit",
//         description: "A trendy jumpsuit for women",
//         price: 54.99,
//         brand: "XYZ Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.9,
//         image: "https://example.com/images/womens-jumpsuit.jpg",
//         category: "Women's Clothing",
//     },
//     {
//         _id: uuid(),
//         title: "Women's Top",
//         description: "A fashionable top for women",
//         price: 34.99,
//         brand: "ABC Brand",
//         size: ["S", "M", "L", "XL"],
//         rating: 4.0,
//         image: "https://example.com/images/womens-top.jpg",
//         category: "Women's Clothing",
//     },

//     // Electonics data

//     {
//         _id: uuid(),
//         title: "Smartphone",
//         description: "A powerful smartphone with advanced features",
//         price: 699.99,
//         brand: "XYZ Brand",
//         size: ["128GB", "256GB", "512GB"],
//         rating: 4.5,
//         image: "https://example.com/images/smartphone.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "Laptop",
//         description: "A high-performance laptop for work and gaming",
//         price: 1299.99,
//         brand: "ABC Brand",
//         size: ["13-inch", "15-inch", "17-inch"],
//         rating: 4.2,
//         image: "https://example.com/images/laptop.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "Headphones",
//         description: "Wireless headphones with noise cancellation",
//         price: 199.99,
//         brand: "XYZ Brand",
//         size: ["One Size"],
//         rating: 4.8,
//         image: "https://example.com/images/headphones.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "Smart TV",
//         description: "A high-resolution smart TV with built-in apps",
//         price: 899.99,
//         brand: "ABC Brand",
//         size: ["55-inch", "65-inch", "75-inch"],
//         rating: 4.6,
//         image: "https://example.com/images/smart-tv.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "Smartwatch",
//         description: "A feature-rich smartwatch with health tracking",
//         price: 299.99,
//         brand: "XYZ Brand",
//         size: ["One Size"],
//         rating: 4.3,
//         image: "https://example.com/images/smartwatch.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "Camera",
//         description: "A professional-grade camera for photography enthusiasts",
//         price: 1499.99,
//         brand: "ABC Brand",
//         size: ["One Size"],
//         rating: 4.7,
//         image: "https://example.com/images/camera.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "Tablet",
//         description: "A versatile tablet for work and entertainment",
//         price: 499.99,
//         brand: "XYZ Brand",
//         size: ["10-inch", "12-inch"],
//         rating: 4.1,
//         image: "https://example.com/images/tablet.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "Gaming Console",
//         description: "A gaming console for immersive gaming experiences",
//         price: 399.99,
//         brand: "ABC Brand",
//         size: ["One Size"],
//         rating: 4.4,
//         image: "https://example.com/images/gaming-console.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "Wireless Speaker",
//         description: "A portable wireless speaker for music on the go",
//         price: 79.99,
//         brand: "XYZ Brand",
//         size: ["One Size"],
//         rating: 4.9,
//         image: "https://example.com/images/wireless-speaker.jpg",
//         category: "Electronics",
//     },
//     {
//         _id: uuid(),
//         title: "External Hard Drive",
//         description: "A reliable external hard drive for data storage",
//         price: 129.99,
//         brand: "ABC Brand",
//         size: ["1TB", "2TB", "4TB"],
//         rating: 4.0,
//         image: "https://example.com/images/external-hard-drive.jpg",
//         category: "Electronics",
//     },
// ];

const Products = () => {
    const { products, filters } = useContext(DataContext);

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
    //     console.log("sizeFilteredData:", sizeFilteredData);
    // }, [sizeFilteredData]);

    return (
        <div>
            <Header />
            <div className="products__page__container">
                <ProductFiltersAside />

                <div className="products__right__container">
                    <p>{RatingFilteredData.length} Products Found</p>
                    <div className="productlist-main-cards-container">
                        {RatingFilteredData.map((product) => (
                            <Product product={product} key={product._id} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Products;
