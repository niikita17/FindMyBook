
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";
import { Link } from "react-router-dom";
import api from "../../api/axios";
const NavBar = () => {
    const user = getUser();
    const role = user?.role;
    const navigate = useNavigate();
    const handleLogout = async () => {

        try {

            await api.post("/auth/logout");

        } catch (error) {

            console.log(error);

        } finally {

            localStorage.removeItem("token");


            navigate("/");
        }
    };
    return (
        <>
            <div className="">

                <nav className="navbar fixed-top navbar-expand-lg bg-dark p-3  "

                    style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        boxShadow: "0 0 15px #a354e8",
                        color: "white",
                        borderBottom: "1px solid #a354e8"
                    }}
                >
                    <div className="container-fluid">
                        <button
                            className="navbar-toggler bg-light"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarScroll"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav nav-underline me-auto my-2 my-lg-0" >
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-white"
                                        to="/home"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-white"
                                        to="/home/cart"
                                    >
                                        Cart
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#">orders</a>
                                </li>
                                {
                                    role === "Admin"
                                    && <li className="nav-item">
                                        <Link
                                            className="nav-link text-white"
                                            to="/admin"
                                        >
                                            Admin
                                        </Link>
                                    </li>
                                }

                            </ul>

                            <div className="ms-3">
                                <button className="btn btn-primary" type="submit" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default NavBar;