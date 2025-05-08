import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../App.css";
import Chatbot from "./Chatbot";

const Homepage = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <h1>ToyTopia</h1>
        </div>
        <div className="nav-links">
          <div className="nav-item"><a href="/">Home</a></div>
          <div className="nav-item">
            <a href="/getgames">Products</a>
            <ul className="dropdown">
              <li><a href="#kidstoys">Kid's Toys</a></li>
              <li><a href="#boardgames">Board Games</a></li>
              <li><a href="#gamingconsoles">Gaming Consoles</a></li>
            </ul>
          </div>
          <div className="nav-item"><a href="/addproducts">Upload</a></div>

          {user ? (
            <>
              <div className="nav-item">Welcome, {user.name.split(" ")[0]}</div>
              <div className="nav-item"><button onClick={logout}>Logout</button></div>
            </>
          ) : (
            <>
              <div className="nav-item"><a href="/signup">Sign Up</a></div>
              <div className="nav-item"><a href="/signin">Sign In</a></div>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div>
          <h1>Welcome to ToyTopia{user ? `, ${user.name.split(" ")[0]}` : ""}!</h1>
          <p>Explore a world of fun, games, and imagination.</p>
        </div>
      </div>

      {/* Featured Products */}
      <section className="featured-products">
        <h2 className="featured">Featured Products</h2>
        <div className="product-container">
        <div className="product-card">
            <img src="/images/kidstoys.jpg" alt="Toy 1" className="product-image" />
            <h3 className="product-title">Kid's Toys</h3>
            <p className="product-description">Spark imagination and joy with our colorful kids toys—safe, educational, and fun for endless hours of creative play and learning!</p>
            <button className="product-button">View Kid's Toys</button>
          </div>

          <div className="product-card">
            <img src="/images/boardgames.jpg" alt="Toy 2" className="product-image" />
            <h3 className="product-title">Board Games</h3>
            <p className="product-description">Discover endless fun with our exciting board games—perfect for family nights, friendly competition, and unforgettable moments together. Play today!</p>
            <button className="product-button">View Board Games</button>
          </div>

          <div className="product-card">
            <img src="/images/gamingconsoles.jpg" alt="Toy 3" className="product-image" />
            <h3 className="product-title">Gaming Consoles</h3>
            <p className="product-description">Experience next-level entertainment with our cutting-edge gaming consoles—lightning-fast performance, stunning graphics, and immersive gameplay for every gamer. Upgrade now!</p>
            <button className="product-button">View Gaming consoles</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-16 px-8 rounded-2xl shadow-2xl">
  <div className="max-w-3xl mx-auto text-center">
    <h3 className="text-4xl font-extrabold mb-6 drop-shadow-lg">About Us</h3>
    <p className="text-lg leading-relaxed tracking-wide drop-shadow-md">
      At ToyTopia, we bring joy to every child with an amazing selection
      of toys, games, and consoles. Our mission is to offer the best
      products that encourage creativity and fun!
    </p>
  </div>
</section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 ToyTopia. All Rights Reserved.</p>
        <p>
          Follow us on the following platforms <br />
           <a href="https://facebook.com"><img src="/images/fb.jpg" alt="Facebook" width={40} /></a>,
            <a href="https://instagram.com"><img src="images/insta.jpg" alt="Instagram" width={40}/></a>,
          <a href="https://twitter.com"><img src="/images/x.png" alt="X" width={40}/></a>
        </p><br />
        <p className="copyright">Developed by Parmenas Ngugi &copy; 2025. All rights reserved.</p>
      </footer>
         {/* Other homepage content */}



      <Chatbot />
    </>
  );
};

export default Homepage;
