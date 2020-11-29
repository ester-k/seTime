const user = require('../models/User');
const userService = require('../services/usersService');
const createUser = async (req, res) => {
    try {
        const user = req.body;
        const createdUser = await userService.createUser(user);
        return res.status(200).json(createdUser);
    }
    catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}
const getRolesList = async (req, res) => {
    try {
      const rolesList = await userService.getRolesList();
      return res.status(200).json(rolesList);
    } catch (error) {
      console.log("error in controller: " + error);
      return res.status(200).json(rolesList);
    }
  };
const getUser = async (req, res) => {
    try {

        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    getUser,
    createUser,
    getRolesList
}