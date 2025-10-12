
import { Router } from 'express';

const router = Router();

const successfulResponse = (message, data = null) => ({
  success: true,
  message,
  data,
});

const invalidResponse = (message, data = null, status = 400) => ({
  status,
  message,
  data,
});
const cleanObject = (data = {}) => {
  let cleanedObj = {};
  for (let key in data) {
    if (
      data.hasOwnProperty(key) &&
      data[key] &&
      data[key] !== null &&
      data[key] !== '' &&
      data[key] !== undefined &&
      data[key] !== 'undefined'
    ) {
      cleanedObj[key] = data[key];
    }
  }
  return cleanedObj;
};


function excelDateToJSDate(value) {
  const parsed = new Date(value);
  if (!isNaN(parsed.getTime())) return parsed;
  const serial = Number(value);
  if (!isNaN(serial) && serial > 0) {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const jsDate = new Date(excelEpoch.getTime() + serial * 86400 * 1000);
    return jsDate;
  }
  return new Date();
}

// Global Try Catch handler
const AsyncTryCatch = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch((err) => next(err));
};

// round to two decimal places
function roundToTwoDecimalPlaces(number) {
  const factor = Math.pow(10, 2);
  return Math.round(number * factor) / factor;
}


const isIdValid = (id) => {
  return mongoose.isValidObjectId(id);
};

const checkBodyValues = (body) =>
  Object.values(body).every(
    (val) => val !== '' || val !== null || val !== undefined
  );



export {
  router,
  successfulResponse,
  invalidResponse,
  AsyncTryCatch,
  roundToTwoDecimalPlaces,
  isIdValid,
  checkBodyValues,
  cleanObject,
  excelDateToJSDate
};
