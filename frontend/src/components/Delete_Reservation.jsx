import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";

const DeleteReservation = () => {
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState([]);
  
  const fetchReservations = async () => {
    try {
       console.log(encodeURIComponent(email))
      const response = await axios.get(`http://localhost:4000/api/v1/reservation/get?email=${encodeURIComponent(email)}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      setReservations(response.data.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
    console.log("fetched reservations")
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
        //This is how a user gets to delete a reservation by calling the delete end point!
      await axios.delete(`http://localhost:4000/api/v1/reservation/delete/${reservationId}`);
      // End point for delete reservation that uses the backend 
        console.log(reservationId + "hereid")
      // Remove the deleted reservation from the state
      setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== reservationId));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
    console.log("Deleted reservation")
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <div className="reservation_form_box">
            <h1>DELETE A RESERVATION</h1>
            <p>Enter your email below and then click check reservations to view and delete your reservations!</p>
            <form> 
            <div className="banner">
              <input
                type="text"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="button" onClick={fetchReservations}>
              CHECK RESERVATIONS{" "}
              <span>
                <HiOutlineArrowNarrowRight />
              </span>
            </button>


        
            </form>
            <div className="banner">
            <div className="banner">
  <div className="reservation_list">
    <h2>Your Reservations</h2>
    {email && reservations.length === 0 ? (
      <p>No reservations found for the specified email address</p>
    ) : (
      <div className="card-container">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="card">
            <div className="card-body">
              <h3 className="card-title">{reservation.name}</h3>
              <div className="reservation-details">
                <p className="card-text">Date: {reservation.date}</p>
                <p className="card-text">Time: {reservation.time}</p>
              </div>
              <button onClick={() => handleDeleteReservation(reservation._id)} className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

        </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DeleteReservation;

