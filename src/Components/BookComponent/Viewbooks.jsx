import axios from "axios";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const ViewBook = () => {
    const [books, setBooks] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");

    const [categoryId, setCategoryId] = useState("");
    const navigate = useNavigate();
    //vew a book
    const handleView = (id) => {
        navigate(`/home/book/${id}`);
    };
    //Add to cart

    const fetchBooks = async () => {

        try {

            const response = await api.get(
                "/book/getall",
                {
                    params: {
                        page: page,
                        pageSize: 6,
                        search: search,
                        categoryId: categoryId || null
                    }
                }
            );
            console.log(response.data.data);
            setBooks(response.data.data.items);

            setTotalPages(response.data.data.totalPages);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, [page, search, categoryId]);

    return (
        <>
            <div className="container" >

                <h1>Books</h1>

                {/* SEARCH */}
                <div className="d-flex" role="search">
                    <input className="border rounded me-2 p-2" type="search" placeholder="Search" aria-label="Search" value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }} />

                    {/* CATEGORY FILTER */}
                    <select className=" border rounded  p-2"
                        value={categoryId}
                        onChange={(e) => {
                            setPage(1);
                            setCategoryId(e.target.value);
                        }}
                    >
                        <option value="">All Categories</option>

                        <option value="1">Story</option>

                        <option value="2">History</option>

                        <option value="3">Horror</option>

                    </select>
                </div>



                {/* PRODUCTS */}

                <div className="row row-cols-1 row-cols-md-3 my-2 g-4">

                    {books.map((book) => (
                        <div className="col mb-4" key={book.id}>
                            <div className="card p-3 m-3 border-rounded h-100 bg-dark text-white"


                                style={{
                                    backgroundColor: "rgba(0,0,0,0.4)",
                                    boxShadow: "0 0 4px #a354e8",
                                    color: "white",

                                }}
                            >

                                <img
                                    src={`${book.imageUrl}`}
                                    className="card-img-top p-3 hover-overlay"
                                    alt="book"
                                    style={{
                                        height: "250px",
                                        width: "auto",
                                        objectFit: "cover"
                                    }}
                                />        <div className="card-body">
                                    <h4 className="card-title ">{book.title}</h4>
                                    <h6 className="card-text">{book.price}</h6>
                                    <p className="card-text">{book.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">{book.category?.name}</small></p>

                                </div>
                                <div className="d-flex mb-3 ms-3">
                                    <button className="btn btn-tertiary px-2 text-bg-light" onClick={() => handleView(book.id)}> View</button>

                                </div>
                            </div></div>

                    ))}
                </div>


                {/* PAGINATION */}
                <div className="text-white  mt-5 mb-4">

                    <button className="btn btn-light fw-medium"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span style={{ margin: "0 10px" }}>
                        Page {page} of {totalPages}
                    </span>

                    <button className="btn btn-light fw-medium"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>

        </>
    )
}

export default ViewBook;