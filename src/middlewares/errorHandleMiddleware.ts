import { ErrorRequestHandler } from "express";


const errorHandle: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.message);
  return res.status(500).json({ message: "internal server error" });

}

export default errorHandle;