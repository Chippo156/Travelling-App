import axios from "../axios/axios";

export let createBooking = async (
  user_id,
  destination_id,
  room_id,
  payment_status,
  payment_method,
  check_in_date,
  check_out_date,

  amount
) => {
  try {
    const response = await axios.post("/bookings", {
      user_id,
      destination_id,
      room_id,
      payment_status,
      payment_method,
      check_in_date,
      check_out_date,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
