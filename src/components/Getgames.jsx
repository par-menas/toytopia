import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Chatbot from "./Chatbot";

const Getgames = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryPages, setCategoryPages] = useState({});
  const gamesPerPage = 8;

  const image_path = "https://parm3nas.pythonanywhere.com/static/images/";

  // Normalize category names to expected standard
  const normalizeCategory = (cat) => {
    const str = cat.toLowerCase().replace(/\s+/g, "");
    if (str.includes("board")) return "Board Games";
    if (str.includes("console")) return "Gaming Consoles";
    if (str.includes("kid") || str.includes("toy")) return "Kids Toys";
    return "Other";
  };

  const fetchGames = async () => {
    setLoading("Please Wait...");
    try {
      const response = await axios.get("https://parm3nas.pythonanywhere.com/api/get_products");

      // Normalize category field
      const normalizedData = response.data.map(game => ({
        ...game,
        normalizedCategory: normalizeCategory(game.category)
      }));

      setGames(normalizedData);
      setLoading("");

      const categories = [...new Set(normalizedData.map(g => g.normalizedCategory))];
      const initialPages = {};
      categories.forEach(cat => initialPages[cat] = 1);
      setCategoryPages(initialPages);
    } catch (error) {
      setLoading("");
      setError("Error fetching products");
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueCategories = [...new Set(filteredGames.map(g => g.normalizedCategory))];

  const handlePageChange = (category, newPage) => {
    setCategoryPages(prev => ({ ...prev, [category]: newPage }));
  };

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
              {uniqueCategories.map(cat => {
                const sectionId = cat.replace(/[^a-zA-Z]/g, "").toLowerCase();
                return (
                  <li key={cat}><a href={`#${sectionId}`}>{cat}</a></li>
                );
              })}
            </ul>
          </div>
          <div className="nav-item"><a href="/addproducts">Upload</a></div>
          <div className="nav-item"><a href="/signup">Sign Up</a></div>
          <div className="nav-item"><a href="/signin">Sign In</a></div>
        </div>
      </nav>

      <div className="getgames-background">
        <div className="container">
          <h1 className="store text-center my-4">Products In Store</h1>

          {/* 🔍 Search Bar */}
          <div className="row mb-4">
            <div className="col-12">
              <input
                type="text"
                className="form-control form-control-lg search-bar"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '1.1rem',
                  borderRadius: '10px',
                  boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </div>

          {loading && <div className="alert alert-info text-center">{loading}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* Display Products by Category */}
          {uniqueCategories.map((category) => {
            const sectionId = category.replace(/[^a-zA-Z]/g, "").toLowerCase();
            const categoryGames = filteredGames.filter(game => game.normalizedCategory === category);

            if (categoryGames.length === 0) return null;

            const currentPage = categoryPages[category] || 1;
            const indexOfLastGame = currentPage * gamesPerPage;
            const indexOfFirstGame = indexOfLastGame - gamesPerPage;
            const currentGames = categoryGames.slice(indexOfFirstGame, indexOfLastGame);
            const totalPages = Math.ceil(categoryGames.length / gamesPerPage);

            return (
              <div key={category} id={sectionId} className="mb-5">
                <button
                  className="btn btn-outline-primary btn-lg w-100 mb-3"
                  style={{ fontSize: '1.4rem', fontWeight: 'bold' }}
                >
                  {category}
                </button>

                <div className="row">
                  {currentGames.map((game, index) => (
                    <div key={index} className="col-md-3 mb-4">
                      <div className="product-card-get">
                        <img
                          src={image_path + game.games_photo}
                          alt={game.name}
                          className="product-image-get"
                        />
                        <div className="card-body">
                          <h5 className="product-title-get">{game.name}</h5>
                          <p className="product-description-get">{game.category}</p>
                          <b className="text-warning">{game.price}</b><br />
                          <button
                            className="product-button-get mt-3"
                            onClick={() => navigate('/makepayment', { state: { game } })}
                          >
                            Purchase Item
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-secondary mx-2"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(category, currentPage - 1)}
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      className={`btn mx-1 ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handlePageChange(category, idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    className="btn btn-outline-secondary mx-2"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(category, currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Chatbot />
    </>
  );
};

export default Getgames;
