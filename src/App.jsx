import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPriceOption, setSelectedPriceOption] = useState("all");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handlePriceFilterChange = (event) => {
    const option = event.target.value;
    setSelectedPriceOption(option);
    filterProducts(selectedCategoryOption, option);
  };

  const handleCategoryFilterChange = (event) => {
    const option = event.target.value;
    setSelectedCategoryOption(option);
    filterProducts(option, selectedPriceOption);
  };

  const filterProducts = (categoryOption, priceOption) => {
    let filtered = [...products];
    if (categoryOption !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryOption
      );
    }
    if (priceOption === "cheap") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceOption === "expensive") {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <h1>Cars</h1>
      <div className="filter">
        <label htmlFor="priceFilter">Filter by Price:</label>
        <select
          id="priceFilter"
          value={selectedPriceOption}
          onChange={handlePriceFilterChange}
        >
          <option value="all">Default</option>
          <option value="cheap">Cheap to Expensive</option>
          <option value="expensive">Expensive to Cheap</option>
        </select>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategoryOption}
          onChange={handleCategoryFilterChange}
        >
          <option value="all">Default</option>
          <option value="Fuel">Fuel</option>
          <option value="Electronic">Electronic</option>
        </select>
      </div>
      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} width="200" />
            <p>Category: {product.category}</p>
            <p>Price: ${product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
