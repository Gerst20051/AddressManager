const dev = {
  API_URL: 'http://localhost:3000/dev',
  SWAGGER_URL: 'http://localhost:3000/dev/swagger',
};

const prod = {
  API_URL: 'https://6tpeua70ga.execute-api.us-east-1.amazonaws.com/dev',
  SWAGGER_URL: 'https://6tpeua70ga.execute-api.us-east-1.amazonaws.com/dev/swagger',
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config,
};
