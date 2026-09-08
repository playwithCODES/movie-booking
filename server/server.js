import config from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";


await connectDB();
app.listen(config.port,()=>{
    console.log(`Cinema Booking API is running on the ${config.port}`);
} )

