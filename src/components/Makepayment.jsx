import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import UserContext

const Makepayment = () => {
  const [phone, setPhone] = useState("");
  const { game } = useLocation().state || {}; // Receive the product
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = useContext(UserContext); // Access the current user from context
  const navigate = useNavigate(); // Use navigate for redirection

  // Redirect to Sign In page if the user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  // Function to handle the payment submission
  const submit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading("Please be patient as we process your request"); // Show loading message
    try {
      // Prepare the data to be sent in the request
      const formData = new FormData();
      formData.append("amount", game.price); // Add amount (game price)
      formData.append("phone", phone); // Add phone number

      // Make the API request to process the payment
      const response = await axios.post(
        "https://parm3nas.pythonanywhere.com/api/mpesa_payment", // Endpoint for the payment API
        formData // Sending the form data
      );

      // Handle the response here, you can log it or update the state
      console.log(response.data);

      // Set success message and stop loading
      setSuccess("Kindly complete payment on your end");
      setLoading(""); // Clear loading state
    } catch (error) {
      // Handle any error that occurs during the request
      setLoading(""); // Stop loading
      setError(error.message); // Display the error message
    }
  };

  const image_path = "https://parm3nas.pythonanywhere.com/static/images/";

  return (
    <div className="makepaymment-background">
      <div className="payment">
        <div className="card shadow p-4">
          <h1 className="text-center text-success mt-4">
            Complete Purchase <br /> Lipa na MPESA
          </h1>
          {loading && <div className="alert alert-info text-center">{loading}</div>}
          {success && <div className="alert alert-success text-center">{success}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}
          
          {/* Product image */}
          <img src={image_path + game?.games_photo} alt="" className="productimage" height={200} width={200} />
          <h2 className="text-info">{game?.name}</h2>
          <p className="text-muted">{game?.category}</p>
          <p className="text-warning">{game?.price}</p>
          
          {/* MPESA Payment Form */}
          <form onSubmit={submit}>
            <input
              type="number"
              placeholder="Enter Phone 254XXXXXXXXX"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
            {phone} <br />
            <button className="btn btn-dark mt-2 end">Purchase Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;
