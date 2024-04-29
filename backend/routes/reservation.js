import express from "express";
import create_restaurant from "../controller/createRestaurant.js";
import delete_reservation from "../controller/delete_reservation.js";
import get_restaurants from "../controller/getRestaurants.js";
import get_reservations_email from "../controller/get_reservation.js";
import insert_many_restaurants from "../controller/insertManyRestaurant.js";
import send_reservation from "../controller/reservation.js";
import { update_reservation } from "../controller/update_reservation.js";

const router = express.Router();

router.post("/send", send_reservation);
router.get("/get", get_reservations_email);
router.delete("/delete/:id", delete_reservation)
router.put('/update/:id', update_reservation);
router.post("/create_restaurant", create_restaurant);
router.post("/insert_many_restaurant", insert_many_restaurants);
router.get("/get_restaurants", get_restaurants);

export default router;