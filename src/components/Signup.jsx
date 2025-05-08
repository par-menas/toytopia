import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  // Initialize the states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // Define 3 states for posting data
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Define function to post data
  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please Wait....");
    setError("");  // Clear previous errors
    setSuccess("");  // Clear previous success

    try {
      const data = new FormData();
      data.append("name", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("address", address);
      data.append("password", password);

      const response = await axios.post(
        "https://parm3nas.pythonanywhere.com/api/signup",
        data
      );

      setSuccess(response.data.message || "Signup successful!");
      setLoading("");
    } catch (error) {
      setLoading("");
      setError(
        error.response?.data?.message || "Signup failed. Please check your inputs."
      );
    }
  };

  return (
    <div className="signup-background d-flex justify-content-center align-items-center">
      <div className="col-md-6 p-4 signup-card">
        <h2 className="text-center mb-4">Create an Account</h2>

        {loading && <div className="alert alert-info text-center">{loading}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label text-white">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Email Address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Address</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="sub form-control w-100">Sign Up</button>
        </form>

        <p className="text-center mt-3 text-white">
          Already have an account? <Link to="/signin" className="text-warning text-decoration-none">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
