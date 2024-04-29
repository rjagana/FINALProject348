import app from "./app.js";
import cors from "cors";

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
});


