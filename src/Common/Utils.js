const crypto = require('crypto');
const faker = require('faker');
const chai = require('chai');
const expect = chai.expect;

//For example: "1235124"
const MERCHANT_TYPE = {
  SPA: 1,
  SALON: 2,
  NAIL_SALON: 3,
  MASSAGE_THERAPY: 4,
  HEALTH_CLINIC: 5,
  GYM_CENTER: 6,
};

const compareDate = (input, reponse) => {
  const formatInput = moment(input).local().format('DD/MM/YYYY');
  const formatReponse = moment(reponse).local().format('DD/MM/YYYY');
  formatInput.should.equal(formatReponse);
};

const checkMatch2Arrays = (array1, array2) => {
  JSON.stringify(array1).should.equal(JSON.stringify(array2));
};

function checkSpecialCharacter(text) {
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
  return text.replace(format, '');
}

function checkPhoneNumber(text) {
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\/a-zA-Z]/g;
  return text.replace(format, '');
}

function checkEmail(text) {
  const format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/g;
  return text.replace(format, '');
}

function randomStringNumbericOnly(length = 10) {
  const chars = '0123456789';
  const randomBytes = crypto.randomBytes(length);
  let result = '';

  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % chars.length;
    result += chars.charAt(index);
  }

  return result;
}

//For example: "HelloWorld"
function randomStringAlphabetOnly(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const randomBytes = crypto.randomBytes(length);
  let result = '';

  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % chars.length;
    result += chars.charAt(index);
  }

  return result;
}

//For example: "HelloWorld12345"
function randomStringAlphaNumbericChars(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.randomBytes(length);
  let result = '';

  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % chars.length;
    result += chars.charAt(index);
  }

  return result;
}

//For example: "HelloWorld12345!&!&#!"
function randomStringWithSpecialChars(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsSpecial = '!#$%^&*()_+-=[]{}|;:,<>?/\\'; // without @.
  const randomBytes = crypto.randomBytes(length);
  let result = '';

  let specialIndex = Math.floor(Math.random() * length);
  for (let i = 0; i < length; i++) {
    let index = randomBytes[i] % chars.length;
    if (i == specialIndex) {
      index = randomBytes[i] % charsSpecial.length;
      result += charsSpecial.charAt(index);
    } else {
      result += chars.charAt(index);
    }
  }
  return result;
}

//For example: "Hello World 12345"
function randomStringWithSpaceChar(word = 2, length = 10) {
  let result = '';

  for (let i = 0; i < word; i++) {
    result += randomStringAlphaNumbericChars(parseInt(length / word));
    if (i < word - 1) {
      result += ' ';
    }
  }

  return result;
}

//For example: "    Hello World 12345"
function randomStringBeginWithSpaceChar(spaceLength = 5, word = 2, length = 10) {
  let result = '';
  for (let i = 0; i < spaceLength; i++) {
    result += ' ';
  }
  for (let i = 0; i < word; i++) {
    result += randomStringAlphaNumbericChars(parseInt(length / word));
  }

  return result;
}
//For example: "Hello World 12345     "
function randomStringEndWithSpaceChar(spaceLength = 5, word = 2, length = 10) {
  let result = '';

  for (let i = 0; i < word; i++) {
    result += randomStringAlphaNumbericChars(parseInt(length / word));
  }
  for (let i = 0; i < spaceLength; i++) {
    result += ' ';
  }

  return result;
}

//For example: "     Hello World 12345     "
function randomStringWithSpacingChars(spaceLength = 5, word = 2, length = 10) {
  let result = '';
  for (let i = 0; i < spaceLength; i++) {
    result += ' ';
  }
  for (let i = 0; i < word; i++) {
    result += randomStringAlphaNumbericChars(parseInt(length / word));
    result += ' ';
  }
  for (let i = 0; i < spaceLength; i++) {
    result += ' ';
  }
  return result;
}

// Function to pick a random item from the array
function randomPickItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to random price
function randomPrice(min = 0, max = 999999, decimals = 2) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.random() * (max - min + 1) + min;
  return Number(randomNum.toFixed(decimals));
}

//SQL Injection Based on ""="" is Always True
//https://www.w3schools.com/sql/sql_injection.asp
//For example: sql = 'SELECT * FROM Users WHERE Name ="' + uName + '" AND Pass ="' + uPass + '"'
function stringSqlInjectionAlwaysTrue1() {
  let result = '"="';
  return result;
}

//SQL Injection Based on 1=1 is Always True
//https://www.w3schools.com/sql/sql_injection.asp
//For example: sql = SELECT UserId, Name, Password FROM Users WHERE UserId = 105 or 1=1;
function stringSqlInjectionAlwaysTrue2() {
  let result = '105 OR 1=1';
  return result;
}

//   SQL Injection Based on Batched SQL Statements
//https://www.w3schools.com/sql/sql_injection.asp
//For example: sql = SELECT * FROM Users WHERE UserId = 105; DROP TABLE Suppliers;
function stringSqlInjectionAlwaysTrue3() {
  let result = '105; DROP TABLE add_on';
  return result;
}

function getRandomFromArray(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateFakeEmail() {
  return `NexleTesting${new Date() - 1}@yopmail.com`;
}

function getMerchantContent(merchantName, typeId) {
  let shortDescription = '';
  let fullDescription = '';
  let appName = '';

  switch (typeId) {
    case MERCHANT_TYPE.SPA:
      appName = 'Spa Application';
      shortDescription = faker.lorem.words(80);
      fullDescription = faker.lorem.words(256);
      break;

    case MERCHANT_TYPE.SALON:
      appName = 'Beauty Salon Application';
      shortDescription = faker.lorem.words(80);
      fullDescription = faker.lorem.words(256);
      break;

    case MERCHANT_TYPE.NAIL_SALON:
      appName = 'Nail Salon Application';
      shortDescription = faker.lorem.words(80);
      fullDescription = faker.lorem.words(256);
      break;

    case MERCHANT_TYPE.MASSAGE_THERAPY:
      appName = 'Massage Therapy Application';
      shortDescription = faker.lorem.words(80);
      fullDescription = faker.lorem.words(256);
      break;

    case MERCHANT_TYPE.HEALTH_CLINIC:
      appName = 'Health Clinic Application';
      shortDescription = faker.lorem.words(80);
      fullDescription = faker.lorem.words(256);
      break;

    case MERCHANT_TYPE.GYM_CENTER:
      appName = 'Gym Center Application';
      shortDescription = faker.lorem.words(80);
      fullDescription = faker.lorem.words(256);
      break;

    default:
      appName = 'Barber Shop Application';
      shortDescription = faker.lorem.words(80);
      fullDescription = faker.lorem.words(256);
      break;
  }

  return { shortDescription, fullDescription, appName };
}

function shouldBeAnObject(data) {
  expect(data).to.be.an('object', 'Expected data to be an object');
}

function shouldBeAnArray(data) {
  expect(data).to.be.an('array', 'Expected data to be an array');
}

module.exports = {
  shouldBeAnArray,
  shouldBeAnObject,
  randomStringAlphabetOnly,
  randomStringAlphaNumbericChars,
  randomStringBeginWithSpaceChar,
  randomStringEndWithSpaceChar,
  randomStringNumbericOnly,
  randomStringWithSpecialChars,
  randomStringWithSpaceChar,
  randomStringWithSpacingChars,
  randomPickItem,
  stringSqlInjectionAlwaysTrue1,
  stringSqlInjectionAlwaysTrue2,
  stringSqlInjectionAlwaysTrue3,
  getRandomFromArray,
  generateFakeEmail,
  getMerchantContent,
  randomPrice,
};
