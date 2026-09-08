import Cinema from "../models/Cinema.js";
const createCinema=async(data)=>{
const cinema=await Cinema.create(data);
return cinema;
}

const getAllCinemas=async()=>{
const cinemasList=await Cinema.find();
return cinemasList;
}

const findCinemaById=async(id)=>{
const cinema=await Cinema.findById(id);
return cinema;
}

const updateCinemaById=async(id, data)=>{
const updatedCinema=await Cinema.findByIdAndUpdate(id, data);
return updatedCinema;
}

const deleteCinemaById=async(id)=>{
const deletedCinema=await Cinema.findByIdAndDelete(id);
return {"message":"Cinema deleted Successfully"}
}
export default {
    createCinema,
    getAllCinemas,
    findCinemaById,
    updateCinemaById,
    deleteCinemaById
}