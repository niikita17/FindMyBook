import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import bgImage from "../../assets/images/book.jpeg";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        mobileNo: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/user/register", {
                Name: form.name,
                Email: form.email,
                Password: form.password,
                MobileNo: form.mobileNo
            });

            alert("Registration successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration failed");
        }
    };

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
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.6)"
                }}
            />

            <div
                className="p-4 rounded"
                style={{
                    width: "420px",
                    zIndex: 1,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(5px)",
                    border: "1px solid #a354e8",
                    boxShadow: "0 0 15px #a354e8",
                    color: "white"
                }}
            >
                <h2 className="text-center mb-4">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit}>

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        className="form-control mb-3"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        className="form-control mb-3"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <label>Mobile Number</label>

                    <input
                        type="text"
                        name="mobileNo"
                        className="form-control mb-3"
                        value={form.mobileNo}
                        onChange={handleChange}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        className="form-control mb-4"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: "#a354e8",
                            color: "white"
                        }}
                    >
                        Register
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-light w-100 mt-3"
                        onClick={() => navigate("/")}
                    >
                        Back To Login
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Register;