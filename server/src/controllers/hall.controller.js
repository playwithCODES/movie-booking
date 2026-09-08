import hallService from "../services/hall.service.js"

const createHall=async(req, res)=>{
    const createdHall=await hallService.createHall(req.body);
    res.json(createdHall);
}

const getAllHalls=async(req,res)=>{
    const hallsList=await hallService.getAllHalls();
    res.json(hallsList);
}

const findHallById=async(req,res)=>{
    const hall=await hallService.findHallById(req.params.id);
    res.json(hall);
}

const updateHallById=async(req,res)=>{
    const updatedHall=await hallService.updateHallById(req.params.id, req.body);
    res.json(updatedHall);
}

const deleteHallById=async(req,res)=>{
    const result=await hallService.deleteHallById(req.params.id);
    res.json(result);
}

export default{
    createHall,
    getAllHalls, 
    findHallById, 
    updateHallById, 
    deleteHallById
}