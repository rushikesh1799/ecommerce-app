import React from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    return (
        <section
            className="banner-container"
            onClick={() => navigate("/products")}
        >
            <img
                className="banner_hero_img"
                src="https://res.cloudinary.com/dwegb6a4s/image/upload/v1690200985/Banner4_nyjtep.jpg"
                alt=""
            />
        </section>
    );
};

export default Banner;
