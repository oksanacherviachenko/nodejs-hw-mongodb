// src/middlewares/checkRoles.js

import createHttpError from 'http-errors';
import { ContactCollection } from '../db/models/contactModel.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    if (!req.user) {
      return next(createHttpError(401));
    }

    if (roles.includes(req.user.role)) {
      return next();
    }

    next(createHttpError(403));
  };
