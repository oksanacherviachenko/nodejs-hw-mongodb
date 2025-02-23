//src/middlewares/errorHandler.js
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('❌ Помилка:', err); // детальне логування в консоль

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: {
        name: err.name,
        details: err.details || null,
      },
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
