import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";
import util from 'util';

// This is the post endpoint in order to create a new reservation under the reservation Table

const send_reservation = async (req, res, next) => {
  const { firstName, lastName, date, time, email, phone } = req.body;
  
  // Check if all required fields are present
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  // Sanitize and validate email
  const sanitizedEmail = sanitizeEmail(email);
  if (!sanitizedEmail) {
    return next(new ErrorHandler("Invalid email format!", 400));
  }

  // Sanitize and validate phone number
  const sanitizedPhone = sanitizePhone(phone);
  if (!sanitizedPhone) {
    return next(new ErrorHandler("Invalid phone number format!", 400));
  }
  
  try {
    await Reservation.create({ firstName, lastName, date, time, email: sanitizedEmail, phone: sanitizedPhone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
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

// Function to sanitize and validate email
const sanitizeEmail = (email) => {
  // Regular expression to check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return null; // Return null if email format is invalid
  }
  return email.trim(); // Remove leading and trailing whitespace
};

// Function to sanitize and validate phone number
const sanitizePhone = (phone) => {
  // Regular expression to check phone number format (10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return null; // Return null if phone number format is invalid
  }
  return phone.trim(); // Remove leading and trailing whitespace
};

export default send_reservation;


/* SANITIZE USER INPUTS REQUIREMENT: 

This function, send_reservation, is responsible for creating a new reservation in the reservation database table. 
Before creating the reservation, it sanitizes and validates the user inputs for email and phone number to 
ensure they meet the required format and standards.

Email Sanitization and Validation:
- The function calls the sanitizeEmail function to sanitize and validate the email input.
- The sanitizeEmail function uses a regular expression to check if the email format is valid.
- If the email format is invalid, the function returns null, indicating that the email input is not valid.
- Otherwise, it trims any leading and trailing whitespace from the email and returns the sanitized email.
- If the sanitized email is null, indicating an invalid email format, the function returns an error response.

Phone Number Sanitization and Validation:
- Similarly, the function calls the sanitizePhone function to sanitize and validate the phone number input.
- The sanitizePhone function uses a regular expression to check if the phone number format consists of exactly 10 digits.
- If the phone number format is invalid, the function returns null, indicating that the phone number input is not valid.
- Otherwise, it trims any leading and trailing whitespace from the phone number and returns the sanitized phone number.
- If the sanitized phone number is null, indicating an invalid phone number format, the function returns an error response.

By performing these sanitization and validation checks, the function ensures that only properly formatted email addresses 
and phone numbers are accepted as inputs for creating a new reservation. This helps prevent issues such as database 
errors or security vulnerabilities that could arise from accepting invalid or malicious inputs.
*/



// import  ErrorHandler from "../error/error.js";
// import { Reservation } from "../models/reservationSchema.js";
// import util from 'util';

// // This is the post endpoint in order to create a new reservation under the reservation Table

// const send_reservation = async (req, res, next) => {

//   const { firstName, lastName, date, time, email, phone } = req.body;
//   if (!firstName || !lastName || !email || !date || !time || !phone) {
//     return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
//   }
  
//   try {
//     await Reservation.create({firstName, lastName, date, time, email, phone});
//     res.status(201).json({
//       success: true,
//       message: "Reservation Sent Successfully!",
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

// export default send_reservation;