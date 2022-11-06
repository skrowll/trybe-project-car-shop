import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  error: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.issues });
  }
  const messageAsErrorType = error.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }
  console.log(error);
  return res.status(500).json({ message: 'internal error' });
};

export default errorHandler;