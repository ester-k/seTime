const { Client } = require("../models/client");
const addClient = async (client) => {
  try {
    const createdClient = await Client.create(client);
    console.log("Client created" + client);
    return createdClient;
  } catch (error) {
    console.log(error);
  }
};
