import NavBar from "../Components/CommonCompoenent/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {

    return (
        <div
            className="min-vh-100"

        >

            <NavBar />

            <div className="pt-5">

                <Outlet />

            </div>

        </div>
    );
};

export default Layout;