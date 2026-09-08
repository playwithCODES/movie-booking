const errorMiddleWare = (error, req, res, next) => {

    console.log(error);
    console.log(error.keyPattern);

    // MongoDB duplicate key error
    if (error.code === 11000) {

        // Duplicate Seat
        if (error.keyPattern?.hallId && error.keyPattern?.seatNumber) {
            return res.status(409).json({
                success: false,
                message: "Seat already exists in this hall"
            });
        }

        // Duplicate Hall
        if (error.keyPattern?.cinemaId && error.keyPattern?.name) {
            return res.status(409).json({
                success: false,
                message: "Hall already exists in this cinema"
            });
        }
    }

    // Custom business-rule error
    if (error.statusCode) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }

    // Unknown error
    return res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
};

export default errorMiddleWare;