import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

//Finally, we have the update reservation which uses the id that is a unique key for each reservation in order to update the reservations!
export const update_reservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Assuming the update data is passed in the request body
    const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    return res.status(200).json({ success: true, message: 'Reservation updated successfully', data: updatedReservation });
  } catch (error) {
    next(error);
  }
};
