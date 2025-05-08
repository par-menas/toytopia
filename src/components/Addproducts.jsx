import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Addproducts = () => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [age_recommendation, setAge_recommendation] = useState("");
    const [price, setPrice] = useState("");
    const [stock_quantity, setStock_quantity] = useState("");
    const [games_photo, setGames_photo] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading("Please wait...");
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("name", name);
            data.append("brand", brand);
            data.append("category", category);
            data.append("age_recommendation", age_recommendation);
            data.append("price", price);
            data.append("stock_quantity", stock_quantity);
            data.append("games_photo", games_photo);

            const response = await axios.post("https://parm3nas.pythonanywhere.com/api/add_product", data);
            setSuccess("✅ Product added successfully!");
            setLoading("");
        } catch (error) {
            setLoading("");
            setError("❌ Failed to add product. Please try again.");
        }
    };

    return (
        <div style={{
            background: "linear-gradient(135deg, #d4f1f9, #d6f5e3)",
            minHeight: "100vh",
            paddingTop: "50px"
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 card shadow p-4">
                        <h2 className="text-center mb-4">Add Your Product</h2>

                        {loading && <div className="alert alert-info">{loading}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label>Name (Game)</label>
                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label>Brand</label>
                                <input type="text" className="form-control" onChange={(e) => setBrand(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label>Category</label>
                                <input type="text" className="form-control" onChange={(e) => setCategory(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label>Age Recommendation</label>
                                <input type="text" className="form-control" onChange={(e) => setAge_recommendation(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label>Price (Ksh)</label>
                                <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label>Stock Quantity</label>
                                <input type="number" className="form-control" onChange={(e) => setStock_quantity(e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label>Games Photo</label>
                                <input type="file" className="form-control" onChange={(e) => setGames_photo(e.target.files[0])} accept="image/*" />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addproducts;
