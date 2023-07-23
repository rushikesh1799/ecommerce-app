import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./header.css";
import { DataContext } from "../../context/DataProvider";
import { AuthContext } from "../../context/AuthContext";

import PageviewIcon from "@mui/icons-material/Pageview";

const Header = () => {
    const token = localStorage.getItem("token");

    const [flag, setFlag] = useState(false);

    const navigate = useNavigate();
    const { dispatch, inputSearchedProducts, filters } =
        useContext(DataContext);

    const handleLogout = () => {
        // console.log("logout");
        navigate("/");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    useEffect(() => {
        console.log("inputSearchedProducts", inputSearchedProducts);
    }, [inputSearchedProducts]);
    useEffect(() => {
        console.log("flag", flag);
    }, [flag]);

    return (
        <nav className="navigation">
            <section className="nav-left-section">
                <h1 onClick={() => navigate("/")}>Fashion Fusion</h1>
            </section>

            {/* <form action=""> */}
            <div className="searchbar_container">
                <input
                    type="text"
                    className="search__input"
                    placeholder="search"
                    value={filters.search}
                    onChange={(e) => {
                        dispatch({
                            type: "handleSearchInput",
                            payload: e.target.value,
                        });
                    }}
                    onClick={() => setFlag((prev) => !prev)}
                />
                <section
                    className="searched_products_container"
                    onClick={() => setFlag((prev) => !prev)}
                    // onMouseEnter={() =>
                    //     setTimeout(() => {
                    //         setFlag((prev) => !prev);
                    //     }, 0)
                    // }
                >
                    {flag ? (
                        <div>
                            {inputSearchedProducts.length === 0 ? (
                                <div>
                                    <p>No item to show</p>
                                </div>
                            ) : (
                                <div>
                                    {inputSearchedProducts.length > 5 ? (
                                        <div>
                                            {inputSearchedProducts
                                                .slice(0, 5)
                                                .map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="searched_products"
                                                        onClick={() => {
                                                            dispatch({
                                                                type: "handleSearchInput",
                                                                payload: "",
                                                            });
                                                            navigate(
                                                                `/products/${product._id}`
                                                            );
                                                        }}
                                                    >
                                                        <div className="searched_products_left">
                                                            <PageviewIcon
                                                                sx={{
                                                                    color: "#FF3E6C",
                                                                }}
                                                            />
                                                            <span>
                                                                {product.title}
                                                            </span>
                                                        </div>
                                                        <span>
                                                            ₹ {product.price}
                                                        </span>
                                                    </div>
                                                ))}
                                            <div className="searched_products">
                                                <div className="searched_products_left view_all">
                                                    <PageviewIcon
                                                        sx={{
                                                            color: "#FF3E6C",
                                                        }}
                                                    />
                                                    <span
                                                        onClick={() => {
                                                            navigate(
                                                                "/products"
                                                            );
                                                        }}
                                                    >
                                                        View all products
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            {inputSearchedProducts
                                                .slice(0, 5)
                                                .map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="searched_products"
                                                        onClick={() => {
                                                            dispatch({
                                                                type: "handleSearchInput",
                                                                payload: "",
                                                            });
                                                            navigate(
                                                                `/products/${product._id}`
                                                            );
                                                        }}
                                                    >
                                                        <div className="searched_products_left">
                                                            <PageviewIcon
                                                                sx={{
                                                                    color: "#FF3E6C",
                                                                }}
                                                            />
                                                            <span>
                                                                {product.title}
                                                            </span>
                                                        </div>
                                                        <span>
                                                            ₹ {product.price}
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : null}

                    {/* {flag ? (
                        <div>
                            {inputSearchedProducts.length === 0 ? (
                                <p>No item to show</p>
                                ) : {inputSearchedProducts.length > 5 ? (
                        <div>
                            {inputSearchedProducts
                                .slice(0, 5)
                                .map((product) => (
                                    <div
                                        key={product.id}
                                        className="searched_products"
                                        onClick={() =>
                                            navigate(`/products/${product._id}`)
                                        }
                                    >
                                        <div className="searched_products_left">
                                            <PageviewIcon
                                                sx={{ color: "#FF3E6C" }}
                                            />
                                            <span>{product.title}</span>
                                        </div>
                                        <span>₹ {product.price}</span>
                                    </div>
                                ))}

                            <div className="searched_products">
                                <div className="searched_products_left view_all">
                                    <PageviewIcon sx={{ color: "#FF3E6C" }} />
                                    <span>View all products</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        inputSearchedProducts
                            .slice(0, 5)
                            .map((product, index) => (
                                <div
                                    key={product.id}
                                    className="searched_products"
                                    onClick={() =>
                                        navigate(`/products/${product._id}`)
                                    }
                                >
                                    <div className="searched_products_left">
                                        <PageviewIcon
                                            sx={{ color: "#FF3E6C" }}
                                        />
                                        <span>{product.title}</span>
                                    </div>
                                    <span>₹ {product.price}</span>
                                </div>
                            ))
                    )
                }}



                        </div> : null
                    } */}
                </section>
            </div>

            {/* </form> */}

            <section className="nav-right-section">
                <ul className="nav-links">
                    <li
                        className="nav-link-item nav-explore"
                        onClick={() => navigate("/products")}
                    >
                        Explore
                    </li>

                    <li
                        className="nav-link-item"
                        onClick={() => navigate("/wishlist")}
                    >
                        <i
                            className="fa fa-heart-o fa-lg"
                            aria-hidden="true"
                        ></i>
                    </li>
                    <li
                        className="nav-link-item"
                        onClick={() => navigate("/cart")}
                    >
                        <i
                            className="fa fa-shopping-cart fa-lg"
                            aria-hidden="true"
                        ></i>
                    </li>

                    {!token && (
                        <li
                            className="nav-link-item"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </li>
                    )}

                    {/* {token ? (
                        <li className="nav-link-item" onClick={handleLogout}>
                            Logout
                        </li>
                    ) : (
                        ""
                    )} */}

                    {token ? (
                        <i
                            className="fa fa-user-circle-o fa-lg nav-link-item"
                            aria-hidden="true"
                            onClick={() => navigate("/user-profile")}
                        ></i>
                    ) : (
                        ""
                    )}
                </ul>
            </section>
        </nav>
    );
};

export default Header;
