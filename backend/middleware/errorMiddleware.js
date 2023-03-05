// === 404  not found error middleware =====

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.send('Page not found!');
  res.status(404);
  next(error);
};

//=== 200 error middleware=========
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // console.log(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

export { notFound, errorHandler };
