import paymentService from "../services/payment.service.js"

const createPayment=async(req,res)=>{
    try {
        const createdPayment=await paymentService.createPayment(req.user.userId, req.body);
        res.json(createdPayment);
        
    } catch (error) {
        res.status(error.status || 400).send(error?.message);
    }   
}

const confirmPayment=async(req,res)=>{
    try {
        const confirmedPayment=await paymentService.confirmPayment(req.params.id);
        res.json(confirmedPayment);
    } catch (error) {
        res.status(error.status || 400).send(error?.message);
    }
}

export default {
    createPayment,
    confirmPayment
}