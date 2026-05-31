import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function AdminBookForm() {

    const { id } = useParams(); // if id exists → edit mode
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: "",
        image: null
    });

    // -------------------------
    // GET BOOK FOR EDIT
    // -------------------------
    useEffect(() => {

        if (isEdit) {
            fetchBook();
        }

    }, [id]);

    const fetchBook = async () => {
        try {
            const res = await api.get(`/book/${id}`);
            const b = res.data.data;
            console.log(b);
            setForm({
                title: b.title,
                description: b.description,
                price: b.price,
                stockQuantity: b.stockQuantity,
                categoryId: b.categoryId,
                image: null
            });

        } catch (err) {
            console.log(err);
        }
    };

    // -------------------------
    // HANDLE INPUT
    // -------------------------
    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "price" ||
                    name === "stockQuantity" ||
                    name === "categoryId"
                    ? Number(value)
                    : value
        });
    };

    const handleFile = (e) => {
        setForm({
            ...form,
            image: e.target.files[0]
        });
    };

    // -------------------------
    // SUBMIT
    // -------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("Title", form.title);
        data.append("Description", form.description);
        data.append("Price", form.price);
        data.append("CategoryId", form.categoryId);
        data.append("StockQuantity", form.stockQuantity);

        if (form.image) {
            data.append("Image", form.image);
        }

        try {

            if (isEdit) {

                await api.put(`/book/edit/${id}`, data);
                alert("book edited sucessfully");
            } else {

                await api.post("/book/create", data);
                alert("book added sucessfully");
            }

            navigate("/admin/books");

        } catch (err) {

            console.log(err.response.data);
        }
    };

    // -------------------------
    // UI
    // -------------------------
    return (
        <div className="container mt-5 text-white" style={{ width: "480px" }}>

            <h2>
                {isEdit ? "Edit Book" : "Add Book"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-4">

                <input
                    name="title"
                    className="form-control mb-3"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    className="form-control mb-3"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <input
                    name="price"
                    className="form-control mb-3"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                />
                <input
                    name="stockQuantity"
                    className="form-control mb-3"
                    placeholder="stock"
                    value={form.stockQuantity}
                    onChange={handleChange}
                />

                <select className=" form-control mb-3"
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                >
                    <option value="">All Categories</option>

                    <option value="1">Story</option>

                    <option value="2">History</option>

                    <option value="3">Horror</option>

                </select>

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={handleFile}
                />

                <button className="btn btn-primary w-100">
                    {isEdit ? "Update Book" : "Add Book"}
                </button>

            </form>

        </div>
    );
}

export default AdminBookForm;