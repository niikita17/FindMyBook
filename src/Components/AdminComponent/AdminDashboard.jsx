import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const response =
                await api.get("/admin/dashboard");

            setDashboard(response.data.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (!dashboard) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 text-white">
                <h2>Loading Dashboard...</h2>
            </div>
        );
    }

    const cardStyle = {
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(8px)",
        color: "white",
        border: "1px solid #a354e8",
        boxShadow: "0 0 15px rgba(163,84,232,0.5)",
        transition: "0.3s ease",
        cursor: "pointer",
        minHeight: "180px"
    };

    return (

        <div
            className="container-fluid min-vh-100 py-5"
            style={{
                background:
                    "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
            }}
        >

            <div className="container">

                {/* HEADER */}

                <div className="mb-5 text-center text-white">

                    <h1
                        className="fw-bold"
                        style={{
                            fontSize: "3rem",
                            letterSpacing: "2px"
                        }}
                    >
                        Admin Dashboard
                    </h1>

                    <p className="text-light opacity-75">
                        Manage books, users and orders
                    </p>

                </div>

                {/* CARDS */}

                <div className="row g-4">

                    {/* TOTAL BOOKS */}

                    <div className="col-md-6 col-lg-3">

                        <div
                            className="card rounded-4 p-4 h-100"
                            style={cardStyle}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5 className="text-light">
                                        Total Books
                                    </h5>

                                    <h1 className="fw-bold mt-3">
                                        {dashboard.totalBooks}
                                    </h1>

                                </div>

                                <div style={{ fontSize: "3rem" }}>
                                    📚
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* TOTAL USERS */}

                    <div className="col-md-6 col-lg-3">

                        <div
                            className="card rounded-4 p-4 h-100"
                            style={cardStyle}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5>Total Users</h5>

                                    <h1 className="fw-bold mt-3">
                                        {dashboard.totalUsers}
                                    </h1>

                                </div>

                                <div style={{ fontSize: "3rem" }}>
                                    👤
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* MANAGE BOOKS */}

                    <div className="col-md-6 col-lg-3">

                        <div
                            className="card rounded-4 p-4 h-100"
                            style={cardStyle}
                            onClick={() => navigate("/admin/books")}
                            onMouseEnter={(e) =>
                                e.currentTarget.style.transform =
                                "translateY(-5px)"
                            }
                            onMouseLeave={(e) =>
                                e.currentTarget.style.transform =
                                "translateY(0px)"
                            }
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5>Manage Books</h5>

                                    <p className="mt-3 text-light opacity-75">
                                        Add, Edit and Delete books
                                    </p>

                                </div>

                                <div style={{ fontSize: "3rem" }}>
                                    ✏️
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* MANAGE ORDERS */}

                    <div className="col-md-6 col-lg-3">

                        <div
                            className="card rounded-4 p-4 h-100"
                            style={cardStyle}
                            onMouseEnter={(e) =>
                                e.currentTarget.style.transform =
                                "translateY(-5px)"
                            }
                            onMouseLeave={(e) =>
                                e.currentTarget.style.transform =
                                "translateY(0px)"
                            }
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5>Manage Orders</h5>

                                    <p className="mt-3 text-light opacity-75">
                                        Track all customer orders
                                    </p>

                                </div>

                                <div style={{ fontSize: "3rem" }}>
                                    📦
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;