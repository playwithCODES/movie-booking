import Hall from "../models/Hall.js"

const createHall=async(data)=>{
const hall=await Hall.create(data);
return hall;
}

const getAllHalls=async()=>{
const hallsList=await Hall.find();
return hallsList;
}

const findHallById=async(id)=>{
const hall=await Hall.findById(id);
return hall;
}

const updateHallById=async(id, updatedData)=>{
const updatedHall=await Hall.findByIdAndUpdate(id, updatedData, {new:true});
return updatedHall;
}

const deleteHallById=async(id)=>{
const deletedHall=await Hall.findByIdAndDelete(id);
return {"message":"Hall has been deleted successfully"};
}

export default{
    createHall,
    getAllHalls, 
    findHallById, 
    updateHallById,
    deleteHallById
}