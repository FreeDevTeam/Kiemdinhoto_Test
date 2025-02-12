const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const jsonComparer = require('deep-diff');
const { readFile } = require('fs');

function sendPOSTrequest(url, api, body, headers) {
  return new Promise((resolve, reject) => {
    let _request = chai.request(url).post(api);

    if (headers) {
      for (let i = 0; i < Object.keys(headers).length; i++) {
        const _headerKey = Object.keys(headers)[i];
        const _headerParam = {};
        _headerParam[_headerKey] = Object.values(headers)[i];
        _request.set(_headerParam);
      }
    }

    _request.send(body).end((err, res) => {
      if (err) {
        console.error(err);
        return resolve(undefined);
      }
      return resolve(res);
    });
  });
}

function sendGETrequest(url, api, body, headers) {
  return new Promise((resolve, reject) => {
    let _request = chai.request(url).get(api);

    if (headers) {
      for (let i = 0; i < Object.keys(headers).length; i++) {
        const _headerKey = Object.keys(headers)[i];
        const _headerParam = {};
        _headerParam[_headerKey] = Object.values(headers)[i];
        _request.set(_headerParam);
      }
    }

    _request.end((err, res) => {
      if (err) {
        console.error(err);
        return resolve(undefined);
      }
      return resolve(res);
    });
  });
}

function checkResponseStatus(res, expected, err) {
  if (err) {
    console.log('========Error======');
    console.log(err);
  }

  if (res && res.body && res.body.statusCode && res.body.statusCode !== expected) {
    console.info('========Request=======');
    console.info('url: ', res.request.url);
    console.info('method: ', res.request.method);
    console.info('_header: ', res.request._header);
    console.info('_data: ', res.request._data);
    console.info('========Response======');
    console.info(res.text);
  }

  expect(res.body.statusCode).equal(expected, 'API Failed');
}

async function checkResponseBody(res, templatePath) {
  if (res.body === undefined) {
    console.log('========Request=======');
    console.log(res.request.url);
    console.log(res.request.method);
    console.log(res.request._header);
    console.log(res.request._data);
    console.log('========Response======');
    console.log(res.body);
  }

  return new Promise((resolve, reject) => {
    readFile(templatePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      let templateData = JSON.parse(data);

      let matchResult = jsonComparer(templateData, res.body);
      const TOTALLY_MATCHED = undefined;

      if (matchResult !== TOTALLY_MATCHED) {
        for (let i = 0; i < matchResult.length; i++) {
          const result = matchResult[i];
          if (result.kind === 'D') {
            console.log(result);
          }
          if (result.kind === 'E') {
            if (result.lhs && result.lhs !== null && result.lhs.it && result.lhs.an) {
              console.log(result);
              expect(result.lhs.an).to.not.equal('array');
            } else if (result.rhs && result.rhs !== null && result.rhs.it && result.rhs.an) {
              console.log(result);
              expect(result.rhs.an).to.not.equal('array');
            }
          }
          expect(result.kind).to.not.equal('D');
        }
      }
      resolve(matchResult);
    });
  });
}

module.exports = {
  checkResponseStatus,
  checkResponseBody,
  sendPOSTrequest,
  sendGETrequest,
};
