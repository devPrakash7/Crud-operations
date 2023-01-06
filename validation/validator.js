const mongoose = require("mongoose");

//Validating functions -
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidTitle = function (title) {
  return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0; 
};

const vaildObjectId = function (objectId) {
  if (objectId.length == 24) return true
  return false
};

const isValidString = function (value) {
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
//Validating fucntions ends here.

module.exports = {
  isValid,
  isValidTitle,
  vaildObjectId,
  isValidRequestBody,
  isValidString,
};