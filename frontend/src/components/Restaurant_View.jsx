import React, { useState, useEffect } from "react";
import axios from "axios";

const Restaurant_View = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [uniqueCuisines, setUniqueCuisines] = useState([]);
  const uniquePriceRanges = ["$", "$$", "$$$"]; // Define the unique price ranges

  // Fetch restaurants from the server
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/reservation/get_restaurants");
        setRestaurants(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // Extract unique cuisine types from restaurants
  useEffect(() => {
    const cuisines = [...new Set(restaurants.map(restaurant => restaurant.cuisineType))];
    setUniqueCuisines(cuisines);
  }, [restaurants]);

  // Filter restaurants based on selected cuisines, price ranges, and rating range
  const filteredRestaurants = restaurants.filter(restaurant => {
    const cuisineFilter = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisineType);
    const priceFilter = selectedPriceRanges.length === 0 || selectedPriceRanges.includes(restaurant.priceRange);
    const ratingFilter = (minRating === "" || restaurant.restaurantRating >= parseFloat(minRating)) &&
                        (maxRating === "" || restaurant.restaurantRating <= parseFloat(maxRating));
    return cuisineFilter && priceFilter && ratingFilter;
  });

  // Handle dropdown button click for cuisines
  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle dropdown button click for price range
  const handlePriceDropdownClick = () => {
    setPriceDropdownOpen(!priceDropdownOpen);
  };

  // Handle dropdown button click for rating range
  const handleRatingDropdownClick = () => {
    setRatingDropdownOpen(!ratingDropdownOpen);
  };

  // Handle cuisine selection
  const handleCuisineSelect = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  // Handle price range selection
  const handlePriceRangeSelect = (priceRange) => {
    if (selectedPriceRanges.includes(priceRange)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(p => p !== priceRange));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, priceRange]);
    }
  };

  // Handle rating range input
  const handleMinRatingChange = (e) => {
    setMinRating(e.target.value);
  };

  const handleMaxRatingChange = (e) => {
    setMaxRating(e.target.value);
  };

  // Handle clear rating button click
  const handleClearRating = () => {
    setMinRating("");
    setMaxRating("");
  };

  return (
    <div className="restaurant-list">
      <h1>Restaurants</h1>
      <div className="filter-container">
        <br />
        <h2>Filter by Cuisine:</h2>
        <br />
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={handleDropdownClick}>
            Select Cuisines
          </button>
          <br />
          <br />
          {dropdownOpen && (
            <div className="dropdown-menu">
              {uniqueCuisines.map((cuisine, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={cuisine}
                    checked={selectedCuisines.includes(cuisine)}
                    onChange={() => handleCuisineSelect(cuisine)}
                  />
                  {cuisine}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="filter-container">
        <br />
        <h2>Filter by Price Range:</h2>
        <br />
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={handlePriceDropdownClick}>
            Select Price Ranges
          </button>
          <br />
          <br />
          {priceDropdownOpen && (
            <div className="dropdown-menu">
              {uniquePriceRanges.map((priceRange, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={priceRange}
                    checked={selectedPriceRanges.includes(priceRange)}
                    onChange={() => handlePriceRangeSelect(priceRange)}
                  />
                  {priceRange}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="filter-container">
        <br />
        <h2>Filter by Rating Range:</h2>
        <br />
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={handleRatingDropdownClick}>
            Select Rating Range
          </button>
          <br />
          <br />
          {ratingDropdownOpen && (
            <div className="dropdown-menu">
              <label>
                Min Rating:
                <input type="number" value={minRating} onChange={handleMinRatingChange} min="0" max="10" />
              </label>
              <label>
                Max Rating:
                <input type="number" value={maxRating} onChange={handleMaxRatingChange} min="0" max="10" />
              </label>
              <button onClick={handleClearRating}>Clear Ratings</button> {/* Button to clear ratings */}
            </div>
          )}
        </div>
      </div>
      <div className="card-container">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant._id} className="card" style={{ backgroundImage: `url(${restaurant.imageURL})`}}>
            <div className="card-overlay">
              <div className="card-body">
                <h2 className="card-title">{restaurant.restaurantName}</h2>
                <p className="card-text">Cuisine: {restaurant.cuisineType}</p>
                <p className="card-text">Price Range: {restaurant.priceRange}</p>
                <p className="card-text">Rating: {restaurant.restaurantRating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant_View;
