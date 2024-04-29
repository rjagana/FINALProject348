import ErrorHandler from "../error/error.js";
import { Restaurant } from "../models/restaurantSchema.js";

const get_restaurants = async (req, res, next) => {
  try {
    // Fetch all restaurants from the database
    const restaurants = await Restaurant.find();
    
    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    // Handle errors
    return next(error);
  }
};

export default get_restaurants;