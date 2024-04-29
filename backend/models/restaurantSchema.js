import mongoose from "mongoose";
import validator from "validator";

import pkg from 'http-errors';

const restaurantSchema = new mongoose.Schema({
  //This is the model that contains the attributes for the reservation table
  restaurantName: {
    type: String,
    required: true
  },
  cuisineType: {
    type: String,
    required: true,
  },
  priceRange: {
    type: String,
    required: true,
  },
  restaurantRating: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  }
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);