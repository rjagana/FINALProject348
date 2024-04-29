import React, { useState, useEffect } from "react";
import axios from "axios";

const Report_Generated = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [report, setReport] = useState(null); // State to store the generated report

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

  // Function to generate the report
  const generateReport = () => {
    // Calculate statistics based on restaurants data
    const cuisineCounts = {};
    const averageRatingByCuisine = {};
    const priceRangeAnalysis = {};
    let totalRating = 0;
    const ratingDistribution = { '1-2': 0, '2-3': 0, '3-4': 0, '4-5': 0 };

    restaurants.forEach(restaurant => {
      // Cuisine Type Distribution
      cuisineCounts[restaurant.cuisineType] = (cuisineCounts[restaurant.cuisineType] || 0) + 1;

      // Average Rating by Cuisine
      averageRatingByCuisine[restaurant.cuisineType] = (averageRatingByCuisine[restaurant.cuisineType] || 0) + restaurant.restaurantRating;

      // Price Range Analysis
      priceRangeAnalysis[restaurant.priceRange] = (priceRangeAnalysis[restaurant.priceRange] || 0) + 1;

      // Rating Distribution
      const ratingRange = Math.ceil(restaurant.restaurantRating);
      ratingDistribution[`${ratingRange - 1}-${ratingRange}`]++;
      
      // Total Rating for Average Rating Calculation
      totalRating += restaurant.restaurantRating;
    });

    // Calculate average rating by cuisine
    Object.keys(averageRatingByCuisine).forEach(cuisine => {
      averageRatingByCuisine[cuisine] /= cuisineCounts[cuisine];
    });

    console.log("this is teh average rating for Mexican" + averageRatingByCuisine["American"]);

    // Calculate overall average rating
    const overallAverageRating = totalRating / restaurants.length;

    // Set the generated report
    setReport({ cuisineCounts, averageRatingByCuisine, priceRangeAnalysis, overallAverageRating, ratingDistribution });
  };
//   console.log("this is teh average rating for Mexican" + report.averageRatingByCuisine);
  return (
    <div className="restaurant-list">
      <h1>Restaurant Report</h1>
      <div className="button-container">
        <button className="generate-report-button" onClick={generateReport}>Generate Report</button>
      </div>
      <br></br>
      {report && (
        <div className="report-container">
          <h2>Cuisine Type Distribution</h2>
          <br></br>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Cuisine Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(report.cuisineCounts).map(cuisine => (
                <tr key={cuisine}>
                  <td>{cuisine}</td>
                  <td>{report.cuisineCounts[cuisine]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <h2>Average Rating by Cuisine</h2>
          <br></br>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Cuisine Type</th>
                <th>Average Rating</th>
              </tr>
            </thead>
            <tbody>
            {Object.keys(report.averageRatingByCuisine).map(cuisine => (
            <tr key={cuisine}>
                <td>{cuisine}</td>
                <td>
                {report.averageRatingByCuisine[cuisine] > 0
                    ? (report.averageRatingByCuisine[cuisine]).toFixed(2):0 
                    
                }
                </td>
            </tr>
            ))}
            </tbody>
          </table>
          <br></br>
          <h2>Price Range Analysis</h2>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Price Range</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(report.priceRangeAnalysis).map(priceRange => (
                <tr key={priceRange}>
                  <td>{priceRange}</td>
                  <td>{report.priceRangeAnalysis[priceRange]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
        </div>
      )}
    </div>
  );
};

export default Report_Generated;
