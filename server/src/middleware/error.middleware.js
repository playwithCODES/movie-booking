const errorMiddleWare = (error, req, res, next) => {
  console.log(error);
  console.log(error.keyPattern);
  if (error.code === 11000) {
    if (error.keyPattern?.hallId && error.keyPattern?.seatNumber) {
      return res.status(409).json({
        success: false,
        message: "Seat already exists in this hall",
      });
    }
  }
  return res.status(409).json({
    success: false,
    message: "Hall already exists in this cinema",
  });

  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export default errorMiddleWare;
