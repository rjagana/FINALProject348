import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { databaseConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import router from "./routes/reservation.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", cors()); // Respond to all OPTIONS requests with CORS headers


app.use("/api/v1/reservation", router);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})


databaseConnection();

app.use(errorMiddleware);

export default app;



// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import router from "./routes/reservation.js";

// dotenv.config({ path: "./config/config.env" });

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["POST", "DELETE", "PUT", "OPTIONS"],
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.options("*", cors()); // Respond to all OPTIONS requests with CORS headers

// app.use("/api/v1/reservation", router);
// app.get("/", (req, res) => {
//   return res.status(200).json({
//     success: true,
//     message: "HELLO WORLD AGAIN",
//   });
// });

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1);
//   }
// };

// connectDB();

// app.use(errorMiddleware);

// export default app;
