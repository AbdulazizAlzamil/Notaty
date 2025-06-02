const environment = process.env.NODE_ENV || 'development';

const baseUrl = environment === 'production'
  ? 'https://notaty-0f2c.onrender.com'
  : 'http://localhost:3000';
  
export default baseUrl;
