import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import morgan from 'morgan';
// import requestLoggingMiddleware from '../api/middlewares/failureMiddleware.js'
// import userRouter from'./routers/user.router';
// import loginRouter from'./routers/login.router';

export const createServer = (port) => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
//   app.use(requestLoggingMiddleware);
  app.use(upload.single('file'));
  app.disable('etag');

  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

//   app.use('/', router);
//   app.use('/api/user', userRouter)
//   app.use('/api/verifylogin', loginRouter)

  return app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
};
