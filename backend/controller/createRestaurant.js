// import ErrorHandler from "../error/error.js";
// import { Restaurant } from "../models/restaurantSchema.js"; // Assuming you have a Restaurant model defined
// import util from 'util';

// // This is the post endpoint in order to create a new restaurant

// const create_restaurant = async (req, res, next) => {
//   const { restaurantName, cuisineType, priceRange, restaurantRating, imageURL } = req.body;
  
//   // Check if all required fields are present
//   if (!restaurantName || !cuisineType || !priceRange || !restaurantRating || !imageURL) {
//     return next(new ErrorHandler("Please fill all fields in the restaurant form!", 400));
//   }
  
//   try {
//     // Create a new restaurant instance
//     await Restaurant.create({ restaurantName, cuisineType, priceRange, restaurantRating, imageURL});
    
//     res.status(201).json({
//       success: true,
//       message: "Restaurant created successfully!",
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

// export default create_restaurant;

import ErrorHandler from "../error/error.js";
import { Restaurant } from "../models/restaurantSchema.js"; // Assuming you have a Restaurant model defined
import util from 'util';

// This is the post endpoint in order to create a new restaurant

const create_restaurant = async (req, res, next) => {
  const { restaurantName, cuisineType, priceRange, restaurantRating, imageURL } = req.body;
  
  // Check if all required fields are present
  if (!restaurantName || !cuisineType || !priceRange || !restaurantRating || !imageURL) {
    return next(new ErrorHandler("Please fill all fields in the restaurant form!", 400));
  }
  
  try {
    // Sanitize user inputs
    const sanitizedRestaurantName = sanitizeInput(restaurantName);
    const sanitizedCuisineType = sanitizeInput(cuisineType);
    const sanitizedPriceRange = sanitizeInput(priceRange);
    const sanitizedRestaurantRating = sanitizeInput(restaurantRating);
    const sanitizedImageURL = sanitizeInput(imageURL);

    // Create a new restaurant instance
    await Restaurant.create({ 
      restaurantName: sanitizedRestaurantName, 
      cuisineType: sanitizedCuisineType, 
      priceRange: sanitizedPriceRange, 
      restaurantRating: sanitizedRestaurantRating, 
      imageURL: sanitizedImageURL
    });
    
    res.status(201).json({
      success: true,
      message: "Restaurant created successfully!",
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

// Function to sanitize user inputs
const sanitizeInput = (input) => {
    // Regular expression to match characters that are not alphanumeric, whitespace, hyphens, periods, commas, or dollar signs
    const sanitizedString = input.replace(/[^\w\s\-.,$]/g, '');
  
    // Limit the length of the sanitized string to prevent buffer overflows or excessively long input
    const maxLength = 255;
    const truncatedString = sanitizedString.slice(0, maxLength);
  
    return truncatedString;
  };
  

export default create_restaurant;

/******
 * ATTENTION:
 * 
 * REQUIREMENT HERE! (covers PREPARED statements, however since MongoDB does not support prepared statements,
 * I have done as the handout mentions: "if methods are available, sanitize the user inputs and explain your approach in doing so")
 * 
 * 
 * SANITIZE USER INPUT EXPLANATION for this file:
 * This endpoint creates a new restaurant in the application. Before processing the input data, the `sanitizeInput` function is invoked to ensure 
 * that user-provided data is safe to use. This function removes any characters that 
 * could potentially be used for injection attacks, such as special symbols or escape 
 * characters. Additionally, the function limits the length of the sanitized string 
 * to prevent buffer overflows or excessively long input. By sanitizing the input data 
 * in this way, the application is protected against SQL injection attacks, as malicious 
 * input is neutralized before it can be executed within database operations.
 */