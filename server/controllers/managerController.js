const { json } = require("body-parser");
const managerService = require("../services/managerService");
const addClient = async (req, res) => {
  try {
    const client = req.body;
    const addClient = await managerService.addClient(client);
    return res.status(200).json(addClient);
  } catch (err) {
    return res.status(500).send(err);
  }
}
const addSubproject = async (req, res) => {
  try {
    const subproject = req.body;
   const addSubproject = await managerService.addSubproject(subproject);
    return res.status(200).json(addSubproject);
  } catch (err) {
    return res.status(500).send(err);
  }
}
module.exports = {
  addClient,
  addSubproject
};
