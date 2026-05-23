import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const BookDetails = () => {

    const { id } = useParams();

    const [book, setBook] = useState(null);

    const fetchBook = async () => {

        try {

            const response = await api.get(`/book/${id}`);

            setBook(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBook();
    }, []);

    if (!book) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container text-white mt-5">

            <div className="card bg-dark p-4">

                <img
                    src={`http://localhost:5156/${book.imageUrl}`}
                    alt="book"
                    style={{
                        height: "350px",
                        objectFit: "cover"
                    }}
                />

                <h2 className="mt-3">{book.title}</h2>

                <h4>₹ {book.price}</h4>

                <p>{book.description}</p>

                <h6>{book.category?.name}</h6>

            </div>

        </div>
    );
};

export default BookDetails;