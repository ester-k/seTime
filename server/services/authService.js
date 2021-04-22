const { SignRequest } = require("../models/signRequest");

const addSignRequest = async (req) => {
  try{
    return SignRequest.create(req);
       } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addSignRequest
};
