import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { AuthContext } from "../../context/AuthContext";

import { NavLink, useNavigate } from "react-router-dom";

import "./Signup.css";
import { ReactToastify } from "../../Utility/ReactTostify";

const Signup = () => {
    const navigate = useNavigate();

    const { setToken, setUser } = useContext(AuthContext);

    const [signUpInfo, setSignUpInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        console.log(signUpInfo);
    }, [signUpInfo]);

    const [showPassword, setShowPassword] = useState(false);

    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (signUpInfo.confirmPassword !== signUpInfo.password) {
            ReactToastify("Password is not matching!", "error");
        } else {
            try {
                setTimeout(async () => {
                    const {
                        data: { encodedToken, user },
                    } = await axios.post("/api/auth/signup", signUpInfo);

                    localStorage.setItem("token", encodedToken);
                    localStorage.setItem("user", JSON.stringify(user));

                    setToken(encodedToken);
                    setUser(user);
                }, 500);

                navigate("/products");
            } catch (error) {
                if (error.response.status === 422) {
                    console.log("User already exists");
                } else {
                    console.log(error);
                }
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="page-container">
                <div className="signup-form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSignUp} className="signup-form">
                        <div className="signUp__form__field">
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    value={signUpInfo.firstName}
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            firstName: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <div className="signUp__form__field">
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    value={signUpInfo.lastName}
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            lastName: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <div className="signUp__form__field">
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={signUpInfo.email}
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <div className="signUp__form__field">
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={signUpInfo.password}
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>

                        <div className="signUp__form__field">
                            <label>
                                Confirm Password:
                                <input
                                    type="password"
                                    value={signUpInfo.confirmPassword}
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            confirmPassword: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>

                        <br />
                        <button type="submit">Sign Up</button>
                        <span>
                            Already have an account?{" "}
                            <NavLink to="/login">Log In</NavLink>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
