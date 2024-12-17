/* eslint-disable no-undef */
import dotenv from 'env'
dotenv.config();

 export const config = {
  environment: process.env.NODE_ENV,
  apiPort: parseInt(process.env.API_PORT, 10),
  clientDomain: process.env.CLIENT_DOMAIN,
  jobsResponseSendEmail: process.env.JOBS_RESPONSE_SEND_EMAIL,
  jobsResponseSendEmailFlag:
    process.env.JOBS_RESPONSE_SEND_EMAIL_FLAG === 'true',
  ionos: {
    email: process.env.IONOS_EMAIL,
    password: process.env.IONOS_PASSWORD,
  },
  appInsightsKey: process.env.APPINSIGHTS_KEY,
  cors: {
    allowedOrigins: '*',
    allowedMethods: '*',
  },
  dbConfig: {
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_UNAME,
    password: process.env.DB_PWD,
  },
  awsConfig: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3BucketName: process.env.S3_BUCKET_NAME,
  },
  encryptConfig: {
    secretKey: process.env.SECRET_KEY,
    secretIV: process.env.SECRET_IV,
    encryptionMethod: process.env.ECNRYPTION_METHOD,
  },
};

Object.freeze(config);

