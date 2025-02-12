const BASE_URL = `https://ttdk-sandbox-api.service.makefamousapp.com`;
const TEST_ACCOUNT = {
  superadmin: {
    username: 'superadmin',
    password: 'string',
  },
};
const RESPONSE_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

module.exports = {
  TEST_ACCOUNT,
  RESPONSE_STATUS,
  BASE_URL,
};
