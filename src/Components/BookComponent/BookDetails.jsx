import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getUser } from "../../utils/auth";

const BookDetails = () => {
    const user = getUser.role;
    const { id } = useParams();

    const [book, setBook] = useState(null);

    const [loading, setLoading] = useState(true);


    //Add to cart
    const handleAddToCart =
        async () => {

            try {

                await api.post(
                    "/cart/add",
                    {
                        bookId: id,
                        quantity: 1
                    }
                );

                alert("Added");

            } catch (error) {

                console.log(error.message);

            }
        }
    const fetchBook = async () => {

        try {

            const response = await api.get(`/book/${id}`);

            setBook(response.data.data);


        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchBook();

    }, [id]);

    if (loading) {
        return <h3 className="text-white">Loading...</h3>;
    }

    if (!book) {
        return <h3 className="text-danger">Book not found</h3>;
    }

    return (

        <div className="container mt-5 text-white">

            <div className="card bg-dark p-4">

                <div className="row">

                    <div className="col-md-4">

                        <img
                            src={`${book.imageUrl}`}
                            alt="book"
                            className="img-fluid rounded"
                            style={{
                                height: "400px",
                                objectFit: "cover"
                            }}
                        />

                    </div>

                    <div className="col-md-8 text-white">

                        <h1>{book.title}</h1>

                        <h3 className="mt-3">
                            ₹ {book.price}
                        </h3>

                        <p className="mt-4">
                            {book.description}
                        </p>

                        <h5 className="mt-4">
                            {user === "Admin" && (
                                <>Stock: {book.stockQuantity}</>
                            )}
                        </h5>

                        <button className="btn btn-light mt-4" onClick={handleAddToCart}>
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default BookDetails;