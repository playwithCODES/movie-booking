import axios from "axios";
import config from "../config/config.js";

const payViaKhalti = async (data) => {
  const body = {
    return_url: "http://localhost:5000/api/payment/return-page",
    website_url: "http://localhost:5000",

    // Our amount is NPR, Khalti expects paisa
    amount: data.amount * 100,

    // Use our Payment ID as Khalti's order import {  } from 'module'
    purchase_order_id: data.paymentId,

    purchase_order_name: "Movie Ticket",

    customer_info: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  };

  const response = await axios.post(
    config.khalti.apiUrl,
    body,
    {
      headers: {
        Authorization: `Key ${config.khalti.secret}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

const verifyKhaltiPayment = async (pidx) => {
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    {
      pidx,
    },
    {
      headers: {
        Authorization: `Key ${config.khalti.secret}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export { payViaKhalti, verifyKhaltiPayment };