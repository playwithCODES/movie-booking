import showService from "../services/show.service.js"

const createShow=async(req,res)=>{
    const createdShow=await showService.createShow(req.body);
    res.json(createdShow);
}

 const getAllShows=async(req,res)=>{
    const showsList=await showService.getAllShows();
    res.json(showsList);
 }

 const findShowById=async(req,res)=>{
    const show=await showService.findShowById(req.params.id);
    res.json(show);
 }

 const updateShowById=async(req,res)=>{
    const updatedShow=await showService.updateShowById(req.params.id, req.body);
    res.json(updatedShow);
 }

 const deleteShowById=async(req,res)=>{
    const result=await showService.deleteShowById(req.params.id);
    res.json(result);
 }

 export default {
    createShow,
    getAllShows,
    findShowById,
    updateShowById,
    deleteShowById
 }