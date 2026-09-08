import dotenv from "dotenv";
dotenv.config();

const config={
    port:process.env.PORT|| 5000,
    mongodb_url:process.env.MONGODB_URL || ""
}

export default config;