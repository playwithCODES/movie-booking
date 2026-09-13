import mongoose from "mongoose";

const seatCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "SeatCategory name is required"],
        
    },

    code:{
        type:String,
        unique:true,
        required:[true,"SeatCategory is required"]
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

const SeatCategory=mongoose.model("SeatCategory", seatCategorySchema);
export default SeatCategory;