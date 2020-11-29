const { json } = require("body-parser");
const managerService = require("../services/managerService");
const addClient = async (req, res) => {
  try {
    const client = req.body;
    const addClient = await projectService.addClient(client);
    return res.status(200).json(addClient);
  } catch (err) {
    return res.status(500).send(err);
  }
}
module.exports = {
  addClient,
};
