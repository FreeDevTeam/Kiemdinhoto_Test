const chai = require('chai');
const expect = chai.expect;

const { TEST_ACCOUNT, RESPONSE_STATUS } = require('../../src/Common/Constants');
const { shouldBeAnObject } = require('../../src/common/Utils');
const { loginStaff } = require('../../src/Functions/Staff');

describe('Kiểm tra module Nhân viên', function () {
  it('TC_ADMIN_STAFF_001 Đăng nhập thành công tài khoản superadmin', async function () {
    let data;
    let response = await loginStaff(TEST_ACCOUNT.superadmin.username, TEST_ACCOUNT.superadmin.password, RESPONSE_STATUS.SUCCESS);

    shouldBeAnObject(response.body);
    shouldBeAnObject(response.body.data);

    data = response.body.data;
    expect(data.username).equal(TEST_ACCOUNT.superadmin.username, 'Sai username');
  });
});
