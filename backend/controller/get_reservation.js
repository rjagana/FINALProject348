import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

//Similarly, this is the get reservation by email that acts as a way for user information to be retrieved fro mthe database based on theirk email. 

const get_reservations_email = async (req, res, next) => {
  try {
    // Retrieve the email address from the query parameters
    const {email} = req.query;

    // Query reservations from the database based on the email address
    const reservations = await Reservation.find({email});
    // Check if there are no reservations found
    if (reservations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reservations found for the specified email address"
      });
    }

    // Send the reservations as a JSON response
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    // Handle errors
    return next(error);
  }
};

export default get_reservations_email;
