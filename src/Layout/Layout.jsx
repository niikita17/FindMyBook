import NavBar from "../Components/CommonCompoenent/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {

    return (
        <div
            className="min-vh-100"
            style={{
                background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
            }}
        >

            <NavBar />

            <div className="pt-5">

                <Outlet />

            </div>

        </div>
    );
};

export default Layout;