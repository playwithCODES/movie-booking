import paymentService from "../services/payment.service.js";
import { payViaKhalti, verifyKhaltiPayment } from "../utils/payment.js";
import User from "../models/User.js";

const createPayment = async (req, res) => {
  try {
    // 1. Create our Payment record
    const createdPayment = await paymentService.createPayment(
      req.user.userId,
      req.body
    );

    // 2. Get logged-in user details
    const user = await User.findById(req.user.userId);

    // 3. Send payment information to Khalti
    const khaltiResponse = await payViaKhalti({
      paymentId: createdPayment._id.toString(),
      amount: createdPayment.amount,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });

    // 4. Return both our Payment and Khalti response
    res.json({
      payment: createdPayment,
      khalti: khaltiResponse,
    });

  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};


const confirmPayment = async (req, res) => {
  try {
    const { pidx } = req.body;

    if (!pidx) {
      return res.status(400).json({
        message: "pidx is required",
      });
    }

    const khaltiPayment = await verifyKhaltiPayment(pidx);

    if (khaltiPayment.status !== "Completed") {
      return res.status(400).json({
        message: "Khalti payment is not completed",
        status: khaltiPayment.status,
      });
    }

    const confirmedPayment = await paymentService.confirmPayment(
      req.params.id
    );

    res.json({
      message: "Payment confirmed successfully",
      khaltiPayment,
      payment: confirmedPayment,
    });

  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};


export default {
  createPayment,
  confirmPayment,
};