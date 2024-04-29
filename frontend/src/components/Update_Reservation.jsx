import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateReservation = () => {
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
  });
  const [selectedReservation, setSelectedReservation] = useState(null);

  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/reservation/get?email=${encodeURIComponent(email)}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setReservations(response.data.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleUpdateReservation = (reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      name: reservation.name,
      date: reservation.date,
      time: reservation.time,
    });
    setShowPopup(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // And finally, this is the update reservation that uses a PUT endpoint in order to update the reservation with the new information
        // that is provided for the reservation!
      await axios.put(`http://localhost:4000/api/v1/reservation/update/${selectedReservation._id}`, formData);
      navigate("/update");
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <div className="reservation_form_box">
            <h1>UPDATE A RESERVATION</h1>
            <p>If there are any changes you would like to make to any reservation, you can do so here!</p>
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
              UPDATE RESERVATIONS{" "}
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
                        <button onClick={() => handleUpdateReservation(reservation)} className="btn-update">Update</button>
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

      {/* Popup Form */}
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Update Reservation</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="text" name="date" value={formData.date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="text" name="time" value={formData.time} onChange={handleChange} />
              </div>
              <button type="submit">Update Reservation</button>
            </form>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpdateReservation;
