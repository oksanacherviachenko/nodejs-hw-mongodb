//src/middlewares/parseMultipartForm.js
export const parseMultipartForm = (req, res, next) => {
  if (req.body) {
    if ('isFavourite' in req.body) {
      req.body.isFavourite = req.body.isFavourite === 'true';
    }
  }
  next();
};
