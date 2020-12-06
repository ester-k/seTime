const { Client } = require("../models/client");
const { Subproject } = require("../models/subProject");

const addClient = async (client) => {
  try {
    const createdClient = await Client.create(client);
    return createdClient;
  } catch (error) {
    console.log(error);
  }
};
const addSubproject = async (subproject) => {
  try {
    return await Subproject.create(subproject);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
    addClient,
    addSubproject
}