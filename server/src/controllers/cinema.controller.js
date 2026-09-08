import cinemaService from "../services/cinema.service.js"

const createCinema=async(req,res)=>{
const cinema=await cinemaService.createCinema(req.body);
res.json(cinema);
}

const getAllCinemas=async(req, res)=>{
const cinemasList=await cinemaService.getAllCinemas();
res.json(cinemasList);
}

const findCinemaById=async(req, res)=>{
const cinema=await cinemaService.findCinemaById(req.params.id);
res.json(cinema);
}

const updateCinemaById=async(req, res)=>{
const updatedCinema=await cinemaService.updateCinemaById(req.params.id, req.body);
res.json(updatedCinema);
}

const deleteCinemaById=async(req, res)=>{
    const result=await cinemaService.deleteCinemaById(req.params.id);
    res.json(result);

}

export default {
    createCinema,
    getAllCinemas,
    findCinemaById,
    updateCinemaById,
    deleteCinemaById
}