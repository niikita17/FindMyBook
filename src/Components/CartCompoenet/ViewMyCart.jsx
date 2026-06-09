import { useEffect, useState } from "react";
import api from "../../api/axios";


const ViewMyCart = () => {

    const [cartList, setCartList] = useState([]);

    const [loading, setLoading] = useState(true);

    // remove cart item
    const removeCartItem = async (id) => {

        try {

            const response =
                await api.delete(
                    `/cart/${id}`
                );

            console.log(
                response.data,
                "remove"
            );

            alert(
                "cart item removed successfully"
            );

            fetchMycart();

        } catch (error) {

            console.log(error.message);

        }
    }
    const fetchMycart = async () => {

        try {

            const response =
                await api.get("/cart/mycart");

            console.log(response.data);

            if (
                !response.data ||
                response.data.length === 0
            ) {

                setCartList([]);
                return;
            }

            setCartList(response.data);

        } catch (error) {

            console.log(error.message);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchMycart();

    }, []);



    // --------------------------------
    // LOADING
    // --------------------------------

    if (loading) {

        return (
            <div className="text-center text-white mt-5">
                <h3>Loading Cart...</h3>
            </div>
        );
    }

    // --------------------------------
    // EMPTY CART
    // --------------------------------

    if (cartList.length === 0) {

        return (

            <div
                className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
                style={{
                    background:
                        "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
                }}
            >

                <div
                    className="p-5 rounded text-center"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        border: "1px solid #a354e8",
                        boxShadow: "0 0 15px #a354e8",
                        color: "white",
                        width: "400px"
                    }}
                >

                    <h2>Your Cart is Empty</h2>

                    <p className="mt-3 text-light">
                        Add books to your cart
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div
            className="container-fluid min-vh-100 py-5"
            style={{
                background:
                    "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
            }}
        >

            <div className="container">

                <h1 className="text-white mb-5">
                    My Cart
                </h1>

                <div className="row">

                    {/* CART ITEMS */}

                    <div className="col-lg-8">

                        {
                            cartList.map((item) => (

                                <div
                                    key={item.id}
                                    className="card mb-4 p-3"
                                    style={{
                                        backgroundColor:
                                            "rgba(0,0,0,0.4)",
                                        border:
                                            "1px solid #a354e8",
                                        boxShadow:
                                            "0 0 10px #a354e8",
                                        color: "white"
                                    }}
                                >

                                    <div className="row align-items-center">

                                        {/* IMAGE */}

                                        <div className="col-md-3">

                                            <img
                                                src={`${item.imageUrl}`}
                                                alt="book"
                                                className="img-fluid rounded"
                                                style={{
                                                    height: "180px",
                                                    objectFit: "cover"
                                                }}
                                            />

                                        </div>

                                        {/* DETAILS */}

                                        <div className="col-md-6">

                                            <h4>
                                                {item.title}
                                            </h4>

                                            <p className="text-light">
                                                {item.description}
                                            </p>

                                            <h5>
                                                ₹ {item.price}
                                            </h5>

                                            <p>
                                                Quantity :
                                                {" "}
                                                {item.quantity}
                                            </p>

                                        </div>

                                        {/* ACTIONS */}

                                        <div className="col-md-3 text-center">

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeCartItem(item.id)} >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))
                        }

                    </div>

                    {/* ORDER SUMMARY */}

                    <div className="col-lg-4">

                        <div
                            className="p-4 rounded"
                            style={{
                                backgroundColor:
                                    "rgba(0,0,0,0.4)",
                                border:
                                    "1px solid #a354e8",
                                boxShadow:
                                    "0 0 10px #a354e8",
                                color: "white"
                            }}
                        >

                            <h3>
                                Order Summary
                            </h3>

                            <hr />

                            <h5>
                                Total Items :
                                {" "}
                                {cartList.length}
                            </h5>

                            <h4 className="mt-4">
                                Total :
                                {" "}
                                ₹ {
                                    cartList.reduce(
                                        (total, item) =>
                                            total +
                                            (item.price * item.quantity),
                                        0
                                    )
                                }
                            </h4>

                            <button
                                className="btn w-100 mt-4"
                                style={{
                                    backgroundColor: "#a354e8",
                                    color: "white"
                                }}
                            >
                                Proceed to Checkout
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ViewMyCart;