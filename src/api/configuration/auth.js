import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secret_key = process.env.SECRET_KEY;
const secret_iv = process.env.SECRET_IV;
const encryption_method = process.env.ENCRYPTION_METHOD;
const jwt_secret = process.env.JWT_SECRET; // Add a new environment variable for the JWT secret

if (!secret_key || !secret_iv || !encryption_method || !jwt_secret) {
  throw new Error('SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD, and JWT_SECRET environment variables are required');
}

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash('sha512')
  .update(secret_key)
  .digest('hex')
  .substring(0, 32);

const encryptionIV = crypto
  .createHash('sha512')
  .update(secret_iv)
  .digest('hex')
  .substring(0, 16);

// Encrypt data
export function encryptData(data) {
  const cipher = crypto.createCipheriv(encryption_method, key, encryptionIV);
  const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  return Buffer.from(encrypted, 'hex').toString('base64');
}

// Decrypt data
export function decryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, 'base64');
  const decipher = crypto.createDecipheriv(encryption_method, key, encryptionIV);
  const decrypted = decipher.update(buff.toString('hex'), 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
}

// Generate a JWT token
export function generateJWT(payload, expiresIn = '24h') {
  return jwt.sign(payload, jwt_secret, { expiresIn });
}

// Verify a JWT token
export function verifyJWT(token) {
  try {
    return jwt.verify(token, jwt_secret);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

