const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { UnauthorizedError } = require('../api/middlewares/errorhandler/clientError');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRATION || '24h',
  });
};
const generateRefreshToken = () => {
    return jwt.sign({}, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    });
  };

module.exports = {
    generateToken,
    generateRefreshToken
}