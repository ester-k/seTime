const { Client } = require("../models/client");
const addClient = async (client) => {
  try {
    const createdClient = await Client.create(client);
    return createdClient;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
    addClient,
}