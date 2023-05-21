const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://topicnexus.onrender.com';
const RECAPTCHA_SITE_KEY = '6LddpYQlAAAAAO0iQ1DP7h1B2Tv_E5Ky3PUEq9xJ';

export { BASE_URL, RECAPTCHA_SITE_KEY };
