import React from 'react'
import Reservation from '../components/Reservation.jsx'
import About from '../components/About'
import HeroSection from '../components/HeroSection'
import DeleteReservation from '../components/Delete_Reservation.jsx'
import UpdateReservation from '../components/Update_Reservation.jsx'
import Restaurant_View from '../components/Restaurant_View.jsx'
import Report_Generated from '../components/Report.jsx'

const Home = () => {
  return (
    <>
    <HeroSection/>
    <Reservation/>
    <UpdateReservation/>
    <DeleteReservation/>
    <Restaurant_View/>
    <br></br>
    <br></br>
    <Report_Generated/>
    </>
  )
}

export default Home