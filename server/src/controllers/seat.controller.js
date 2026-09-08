import seatService from "../services/seat.service.js"

const createSeat=async(req,res)=>{
const createdSeat=await seatService.createSeat(req.body);
res.json(createdSeat);
console.log(createdSeat);
}

const getAllSeats=async(req, res)=>{
const seatsList=await seatService.getAllSeats();
res.json(seatsList);
console.log(seatsList);
}

const findSeatById=async(req,res)=>{
const seat=await seatService.findSeatById(req.params.id);
res.json(seat);
}

const updateSeatById=async(req,res)=>{
const updatedSeat=await seatService.updateSeatById(req.params.id, req.body);
res.json(updatedSeat);
}

const deleteSeatById=async(req,res)=>{
const result=await seatService.deleteSeatByID(req.params.id);
res.json(result);
}

export default{
    createSeat,
    getAllSeats,
    findSeatById,
    updateSeatById,
    deleteSeatById
}