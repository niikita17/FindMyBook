import { useState } from "react";
import bgImage from "../../assets/images/book.jpeg";

import { useNavigate } from 'react-router-dom';
import MainPage from "../../pages/Home";
import api from "../../api/axios";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [showLogin, setshowLogin] = useState(false);
    const [error, setError] = useState("");
    const HandleLogin = async (e) => {
        e.preventDefault();
        setError('');
        console.log(email, password);
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        try {
            const response = await api.post(
                "/auth/login",
                {
                    Email: email,
                    Password: password
                });


            localStorage.setItem(
                "token",
                response.data
            );


            navigate('/home');

        } catch (error) {
            if (error.response?.status === 401) {

                alert("Invalid email or password");

            } else {

                alert("Something went wrong");
            }

        }

    }
    return (
        <div
            className="container-fluid vh-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
            }}
        >
            {/* Dark overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 0
                }}
            ></div>
            <div className="row h-100 w-100 " style={{ zIndex: 1, position: "relative" }}>

                <div className="col-6 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <h2 className="text-white">Read every book</h2>
                        <div className="d-flex gap-3 justify-content-center mt-3">
                            <button
                                onClick={() => setshowLogin(true)}
                                className="btn btn-primary"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => navigate("/register")}
                                className="btn btn-outline-light"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-6 d-flex align-items-center">
                    {showLogin && (
                        <div className=" p-4   rounded shadow
                 p-3  " style={{
                                width: "310px", backgroundColor: "rgba(0,0,0,0.4)",
                                backdropFilter: "blur(5px)",
                                color: "white",
                                border: "1px solid #a354e8"
                            }}>
                            <div className="px-3 pb-3">
                                <div className="mt-3 d-flex justify-content-end">
                                    <button onClick={() => setshowLogin(false)} className="btn btn-sm btn-dark ">
                                        X
                                    </button>
                                </div>
                                <label className="mb-2">Enter Email</label>
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label className="mb-2">Password</label>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    onChange={(e) => setPassWord(e.target.value)}
                                />

                                <button className="btn btn-primary w-100 mt-2" onClick={HandleLogin}>Login</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >

    );
}

export default Login;