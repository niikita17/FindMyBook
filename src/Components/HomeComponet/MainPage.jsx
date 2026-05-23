import { useState } from "react";
import NavBar from "../CommonCompoenent/NavBar";
import Notification from "../CommonCompoenent/Notification";
import { useNavigate } from "react-router-dom";
import ViewBook from "../BookComponent/Viewbooks";
const MainPage = () => {
    const navigate = useNavigate();

    const [showpage, setShowPage] = useState("Home");
    const renderComponent = () => {
        if (showpage === "Home")
            return <ViewBook />
        else if (showpage === "Cart")
            return <Cart />
        else if (showpage === "Orders")
            return <Order />
        else
            return <ViewBook />

    }
    return (
        <>
            <div className="container-fluid p-2">
                <div className="row">
                    <NavBar Page={setShowPage} />
                </div>
                <div className="row bg-dark pt-5 mt-4 ">
                    <div className="col-1"></div>
                    <div className="col-10 d-flex justify-content-center">

                        <div>
                            {renderComponent()}
                        </div>
                    </div>

                </div>
            </div >


        </>
    )
}
export default MainPage;