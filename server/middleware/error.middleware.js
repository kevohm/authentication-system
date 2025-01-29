import { ZodError } from "zod";
export const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const errors = [];
    err.errors.forEach((error) => {
      if (error.message) {
        errors.push(error.message);
      }
    });
    return res
      .status(400)
      .json({ message: errors[0] || "Opps! An Error Occurred" });
  }
  console.log(err)
  return res.status(500).json({ message: "Internal Server Error" });
};
