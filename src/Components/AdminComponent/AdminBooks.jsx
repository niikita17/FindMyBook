import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AdminBooks() {

    const [books, setBooks] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");

    const [categoryId, setCategoryId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, [page, search, categoryId]);

    const handleView = (id) => {
        navigate(`/home/book/${id}`);
    };
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

            setBooks(response.data.data.items);

            setTotalPages(response.data.data.totalPages);
        } catch (error) {

            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this book?"
            );

        if (!confirmDelete)
            return;

        try {

            await api.delete(`/book/${id}`);

            alert("book deleted sucessfully");
            setBooks(
                books.filter(
                    (book) => book.id !== id
                )
            );


        } catch (error) {

            console.log(error);
        }
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

                <div className="d-flex justify-content-between align-items-center mb-5">

                    <div>

                        <h1
                            className="text-white fw-bold"
                            style={{
                                fontSize: "2.8rem"
                            }}
                        >
                            Manage Books
                        </h1>

                        <p className="text-light opacity-75">
                            Add, edit and manage all books
                        </p>

                    </div>

                    <button
                        className="btn btn-lg"
                        style={{
                            backgroundColor: "#a354e8",
                            color: "white"
                        }}
                        onClick={() => navigate("/admin/books/add")}
                    >
                        + Add Book
                    </button>

                </div>

                {/* TABLE */}

                <div className="d-flex mb-3" role="search">
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

                <div
                    className="table-responsive rounded-4 p-3"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        border: "1px solid #a354e8",
                        boxShadow: "0 0 15px rgba(163,84,232,0.4)"
                    }}
                >

                    <table
                        className="table align-middle text-white"
                        style={{
                            backgroundColor: "transparent",
                            color: "white"
                        }}
                    >
                        <thead>

                            <tr>

                                <th>Image</th>

                                <th>Title</th>

                                <th>Category</th>

                                <th>Price</th>
                                <th>Stock</th>

                                <th>Description</th>

                                <th className="text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {books.map((book) => (

                                <tr key={book.id}>

                                    {/* IMAGE */}

                                    <td>

                                        <img
                                            src={`http://localhost:5156/${book.imageUrl}`}
                                            alt="book"
                                            style={{
                                                width: "70px",
                                                height: "90px",
                                                objectFit: "cover",
                                                borderRadius: "10px"
                                            }}
                                        />

                                    </td>

                                    {/* TITLE */}

                                    <td className="fw-semibold">
                                        {book.title}
                                    </td>

                                    {/* CATEGORY */}

                                    <td>
                                        {book.categoryName}
                                    </td>

                                    {/* PRICE */}

                                    <td>
                                        ₹ {book.price}
                                    </td>
                                    <td>
                                        {book.stockQuantity}
                                    </td>

                                    {/* DESCRIPTION */}

                                    <td
                                        style={{
                                            maxWidth: "250px"
                                        }}
                                    >
                                        <div
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}
                                        >
                                            {book.description}
                                        </div>
                                    </td>

                                    {/* ACTIONS */}

                                    <td>

                                        <div className="d-flex gap-2 justify-content-center">
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() =>
                                                    handleView(book.id)
                                                }
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-sm"
                                                style={{
                                                    backgroundColor: "#6f42c1",
                                                    color: "white"
                                                }}
                                                onClick={() =>
                                                    navigate(`/admin/books/edit/${book.id}`)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    handleDelete(book.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
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

        </div>
    );
}




export default AdminBooks;