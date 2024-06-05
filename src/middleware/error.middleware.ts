import { NextFunction, Response, Request } from "express";

type Error = {
  status?: number;
  message?: string;
  stack?: string;
  name?: string;
};

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    status,
    message,
  });
}

export function notFoundMiddleware(_: Request, res: Response) {
  res.status(404).json({ message: "Not Found" });
}
