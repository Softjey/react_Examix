export default {
  PORT: 3005,
  BCRYPT_SALT_ROUNDS: 10,
  SESSION_SECRET: 'Very secret key',
  SESSION_MAX_AGE: 7, // in days
  NETWORK_DELAY_BUFFER: 3, // in seconds
  PASSWORD_RESET_EXPIRATION: 15, // in minutes
  EXAM_PRE_AUTHOR_TIMEOUT: 60, // in seconds
  CLIENT_URL: 'http://localhost:5173',
};
