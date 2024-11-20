import axios from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { loadingTrue, loadingFalse } from "../Redux/userSlice";

export let createBooking = async (
  user_id,
  destination_id,
  room_id,
  payment_status,
  payment_method,
  check_in_date,
  check_out_date,
  amount,
  quantity
) => {
  try {
    if (payment_method !== "VNPAY") {
      const response = await axios.post("/bookings", {
        user_id,
        destination_id,
        room_id,
        payment_status,
        payment_method,
        check_in_date,
        check_out_date,
        amount,
        quantity,
      });
      return response.data;
    } else if (payment_method === "VNPAY") {
      if (window.confirm("You definitely pay via card?")) {
        const response = await axios.post("/bookings", {
          user_id,
          destination_id,
          room_id,
          payment_status,
          payment_method,
          check_in_date,
          check_out_date,
          amount,
          quantity,
        });
        handleVNPay(amount, "NCB", response.data.result.id);
      } else {
        alert("You cancel payment");
      }
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let handleVNPay = async (amount, bankCode, orderId) => {
  try {
    const response = await axios.get(
      `/payment/vn-pay?amount=${amount}&bankCode=${bankCode}&orderId=${orderId}`
    );
    const paymentData = response.data;
    if (paymentData?.code === "ok") {
      window.location.href = paymentData.paymentUrl;
    }
  } catch (error) {
    console.error("Error creating payment: ", error);
    alert(`Error creating payment ${error}`);
  }
};
export let getListBookingById = async (id) => {
  try {
    const response = await axios.get(`/bookings/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let getDesitnationById = async (id) => {
  try {
    const response = await axios.get(`/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
