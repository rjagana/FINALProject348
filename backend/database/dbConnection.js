import mongoose from "mongoose";

export const databaseConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "RESERVATIONS"
    })
    .then(() => {
        console.log("Connected to database successfully!")
    })
    .catch((error) => {
        console.log(`There was an error while connecting to the database! ${error}`);
    })
};