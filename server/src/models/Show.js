import mongoose from "mongoose";

const showSchema= new mongoose.Schema({
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    cinemaId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cinema",
        required:true
    },

    hallId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hall",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    startTime:{
        type:String,
        required:true,
    },

    endTime:{
        type:String,
        required:true
    },
    silverPrice:{
        type:Number,
        required:true
    },

    goldPrice:{
        type:Number,
        required:true
    },

    platinumPrice:{
        type:Number, 
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

const Show=mongoose.model("Show", showSchema);
export default Show;