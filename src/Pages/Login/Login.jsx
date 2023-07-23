import React, { useContext, useState } from "react";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "./Login.css";
import Header from "../../Components/Header/Header";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setToken, setUser } = useContext(AuthContext);
    const { loginAsGuest } = useContext(DataContext);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });
            // console.log(response);

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem("token", response.data.encodedToken);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                setToken(response.data.encodedToken);
                setUser(response.data.user);
            }

            // console.log(response.data);
            setToken(response.data.encodedToken);
            if (location.state === null) {
                navigate("/products");
            } else {
                navigate(location?.state?.from?.pathname);
            }

            // Handle successful login, e.g., store token in local storage or redirect
        } catch (error) {
            // Handle login error, e.g., display error message
            console.error(error.response.data?.errors);
        }
    };

    return (
        <div className="login__page__container">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin} className="login__form">
                    <div className="input__fields">
                        <label className="login__form__labels">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email address..."
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <br />
                    <div className="input__fields">
                        <label className="login__form__labels">Password:</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your email password..."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <br />
                    <button type="submit">Login</button>
                    <button type="submit" onClick={loginAsGuest}>
                        Login with Guest Credentials
                    </button>
                    <span>
                        Don't have an account?{" "}
                        <NavLink to="/signup">Join Now</NavLink>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
