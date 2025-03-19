import React, { useState } from "react";
import "./ProductCatalog.css";

const products = [
  {
    id: 1,
    name: "Face Wash",
    category: "Skincare",
    price: 300,
    rating: 4.5,
    image: "./assets/bg.png",
  },
  {
    id: 2,
    name: "Lipstick",
    category: "Makeup",
    price: 500,
    rating: 4.8,
    image: "./assets/bg.png",
  },
  {
    id: 3,
    name: "Shampoo",
    category: "Haircare",
    price: 400,
    rating: 4.2,
    image: "./assets/bg.png",
  },
  {
    id: 4,
    name: "Moisturizer",
    category: "Skincare",
    price: 600,
    rating: 4.7,
    image: "./assets/bg.png",
  },
  {
    id: 5,
    name: "Foundation",
    category: "Makeup",
    price: 900,
    rating: 4.3,
    image: "./assets/bg.png",
  },
  {
    id: 6,
    name: "Conditioner",
    category: "Haircare",
    price: 450,
    rating: 4.5,
    image: "./assets/bg.png",
  },
  {
    id: 7,
    name: "Sunscreen",
    category: "Skincare",
    price: 550,
    rating: 4.9,
    image: "./assets/bg.png",
  },
  {
    id: 8,
    name: "Mascara",
    category: "Makeup",
    price: 700,
    rating: 4.6,
    image: "./assets/bg.png",
  },
  {
    id: 9,
    name: "Hair Oil",
    category: "Haircare",
    price: 300,
    rating: 4.4,
    image: "./assets/bg.png",
  },
  {
    id: 10,
    name: "Blush",
    category: "Makeup",
    price: 650,
    rating: 4.7,
    image: "./assets/bg.png",
  },
  {
    id: 11,
    name: "Body Lotion",
    category: "Skincare",
    price: 500,
    rating: 4.3,
    image: "./assets/bg.png",
  },
  {
    id: 12,
    name: "Hair Serum",
    category: "Haircare",
    price: 350,
    rating: 4.2,
    image: "./assets/bg.png",
  },
];

const Card = ({ children }) => <div className="card">{children}</div>;
const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);
const Input = ({ ...props }) => (
  <input type="text" className="input" {...props} />
);

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const filteredProducts = products
    .filter(
      (product) =>
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!categoryFilter || product.category === categoryFilter) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortType === "lowToHigh") return a.price - b.price;
      if (sortType === "highToLow") return b.price - a.price;
      if (sortType === "rating") return b.rating - a.rating;
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Beauty Products Catalog</h1>
      <div className="flex">
        <Input
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Skincare">Skincare</option>
          <option value="Makeup">Makeup</option>
          <option value="Haircare">Haircare</option>
        </select>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <span>Up to Rs.{priceRange[1]}</span>
      </div>

      <div className="grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Card key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="card-img"
              />
              <CardContent>
                <h2>{product.name}</h2>
                <p>Category: {product.category}</p>
                <p>Price: Rs.{product.price}</p>
                <p>Rating: {product.rating}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            className={currentPage === number + 1 ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
