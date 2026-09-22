import ticketService from "../services/ticket.service.js"

const getTicketById=async(req,res)=>{
    try {
        const ticket=await ticketService.getTicketById(req.params.id);
        res.json(ticket);
        
    } catch (error) {
        res.status(error.status || 400).send(error?.message);
    }
    

}

export default {
    getTicketById
}