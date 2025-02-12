const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const { BASE_URL } = require('../../Common/Constants');
const { checkResponseStatus, sendPOSTrequest } = require('../../Common/Functions');

async function loginStaff(username, password, responseStatus = 200) {
  const body = {
    username: username,
    password: password,
  };
  let _result = await sendPOSTrequest(BASE_URL, '/Staff/loginStaff', body);
  checkResponseStatus(_result, responseStatus);
  return _result;
}

module.exports = {
  loginStaff,
};
