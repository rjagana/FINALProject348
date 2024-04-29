// import ErrorHandler from "../error/error.js";
// import { Restaurant } from "../models/restaurantSchema.js";
// import util from 'util';

// // This is the post endpoint in order to create new restaurants

// const insert_many_restaurants = async (req, res, next) => {
//   const restaurants = req.body;
  
//   // Check if restaurants array is empty
//   if (!Array.isArray(restaurants) || restaurants.length === 0) {
//     return next(new ErrorHandler("No restaurants found in the request!", 400));
//   }
  
//   try {
//     // Create multiple restaurant instances using insertMany()
//     await Restaurant.insertMany(restaurants);
    
//     res.status(201).json({
//       success: true,
//       message: `${restaurants.length} restaurants created successfully!`,
//     });
//   } catch (error) {
//     // Handle Mongoose validation errors
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.values(error.errors).map(err => err.message);
//       return next(new ErrorHandler(validationErrors.join(', '), 400));
//     }
//     // Handle other errors
//     return next(error);
//   }
// };

// export default insert_many_restaurants;

import ErrorHandler from "../error/error.js";
import { Restaurant } from "../models/restaurantSchema.js";
import util from 'util';

// This is the post endpoint in order to create new restaurants

const insert_many_restaurants = async (req, res, next) => {
  const restaurants = req.body;
  
  // Check if restaurants array is empty or not an array
  if (!Array.isArray(restaurants) || restaurants.length === 0) {
    return next(new ErrorHandler("No restaurants found in the request!", 400));
  }
  
  try {
    // Sanitize each restaurant object in the array
    const sanitizedRestaurants = restaurants.map(sanitizeRestaurant);

    // Create multiple restaurant instances using insertMany()
    await Restaurant.insertMany(sanitizedRestaurants);
    
    res.status(201).json({
      success: true,
      message: `${restaurants.length} restaurants created successfully!`,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    // Handle other errors
    return next(error);
  }
};

const sanitizeRestaurant = (restaurant) => {
  const sanitizedRestaurantName = restaurant.restaurantName.trim();
  const sanitizedCuisineType = restaurant.cuisineType.replace(/[^\w\s]/g, '');

  const validPriceRanges = ['$', '$$', '$$$']; 
  const sanitizedPriceRange = validPriceRanges.includes(restaurant.priceRange) ? restaurant.priceRange : '$'; 
  
  const parsedRating = parseFloat(restaurant.restaurantRating);
  const minRating = 0;
  const maxRating = 5;
  const sanitizedRestaurantRating = isNaN(parsedRating) ? minRating : Math.max(minRating, Math.min(parsedRating, maxRating)); 

  const validImageURLRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i;
  const sanitizedImageURL = validImageURLRegex.test(restaurant.imageURL) ? restaurant.imageURL : ''; 

  return {
    restaurantName: sanitizedRestaurantName,
    cuisineType: sanitizedCuisineType,
    priceRange: sanitizedPriceRange,
    restaurantRating: sanitizedRestaurantRating,
    imageURL: sanitizedImageURL,
  };
};

// ATTENTION: REQUIREMENT- Sanitizing my user inputs as prepared statements are not supported in MongoDB

// How I sanitize the user inputs -->
//
//
// 1. Trim whitespace from the restaurantName:
//    This step ensures that leading and trailing whitespace is removed from the restaurant name, preventing any unintended whitespace-related issues.

// 2. Remove special characters from the cuisineType:
//    Special characters are removed from the cuisine type to prevent potential injection attacks or data corruption.
//    Only alphanumeric characters and whitespace are allowed, enhancing data integrity and security.

// 3. Validate and sanitize the priceRange:
//    The price range is validated against a predefined list of valid options ('$' or '$$', or '$$$').
//    If the provided price range is not in the valid list, it defaults to '$' to ensure consistency and prevent unexpected values.

// 4. Ensure restaurantRating is a number within a certain range:
//    The restaurant rating is parsed into a floating-point number and then clamped between a minimum and maximum rating value.
//    This prevents invalid or out-of-range ratings from being stored in the database, maintaining data quality and consistency.

// 5. Validate the format of imageURL:
//    The format of the image URL is validated using a regular expression to ensure it starts with 'http://' or 'https://' and ends 
//    with a valid image file extension (jpg, jpeg, png, gif).
//    By enforcing this format, the function helps prevent potentially harmful or incorrect URLs from being stored, 
//    reducing the risk of broken image links or security vulnerabilities.

// By applying these sanitization techniques, I have made sure that the function helps mitigate risks such as injection attacks, 
// data corruption, and inconsistent or invalid data entries.


export default insert_many_restaurants;
