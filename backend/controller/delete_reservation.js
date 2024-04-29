import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

//This is the backend source code for the endpoints that are used for the database. The one below is the delete endpoint that allows a reservation
// to be deleted by ID. 

const delete_reservation = async (req, res, next) => {
  try {
    const reservationId = req.params.id;

    // Check if reservationId is provided
    if (!reservationId) {
      return next(new ErrorHandler("Reservation ID is missing", 400));
    }

    // Find the reservation by ID and delete it
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

    // Check if the reservation exists
    if (!deletedReservation) {
      return next(new ErrorHandler("Reservation not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Reservation deleted successfully",
      data: deletedReservation,
    });
  } catch (error) {
    // Handle errors
    return next(error);
  }
};

export default delete_reservation;
