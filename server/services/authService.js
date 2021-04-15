const { SignRequest } = require("../models/signRequest");

const addSignRequest = async (req) => {
  console.log("ger!!");
  try{
 let addSignRequest= SignRequest.create(req);
        return addSignRequest;
      
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addSignRequest
};
