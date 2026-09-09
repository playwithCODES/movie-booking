import mongoose from "mongoose";


const resetPasswordSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "User Id is required"],
    },
    token:{
        type:String,
        required:[true,"Reset Password token is required"],
    },
    expiresAt:{
        type:Date,
        default:()=>Date.now + 3600000
    },

    isUsed:{
        type:Boolean,
        default:false,
    },
},

{
    timestamps:true
}
);

const ResetPassword=mongoose.model("ResetPassword", resetPasswordSchema);
export default ResetPassword;