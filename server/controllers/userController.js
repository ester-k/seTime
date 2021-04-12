const { User } = require("../models/User");
const userService = require("../services/usersService");
const createUser = async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await userService.createUser(user);
    return res.status(200).json(createdUser);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getRolesList = async (req, res) => {
  try {
    const rolesList = await userService.getRolesList();
    return res.status(200).json(rolesList);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(rolesList);
  }
};
const getUsersList = async (req, res) => {
  try {
    let users = await userService.getUsersList();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getUserNameById = async (req, res) => {
  try {
    let userName = await userService.getUserNameById(req.params.id);
    return res.status(200).json(userName.clientName);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const updateUserByManager = async (req, res) => {
  try {
    let user = await userService.updateUserByManager(req.body);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const deleteUser=async (req, res) =>{
  try {
    const user = req.params.user;
    const deleteUser = await userService.deleteUser(user);
    return res.status(200).json(deleteUser);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(deleteUser);
  }
}
const updateUser = async (req, res, next) => {
  if (!req.file) {
    return res.status(500).send({ message: "Upload fail" });
  } else {
    try {
      req.body.imageUrl = req.file.filename;
      let image = await userService.updateUser(
        req.body.user,
        req.body.imageUrl,
        req.body.profileName,
        req.body.password,
       
      );
      return res.status(200).json(image);
    } catch (error) {
      console.log("error gallery", error);
    }
  }
};
module.exports = {
  getUsersList,
  createUser,
  getRolesList,
  getUserNameById,
  updateUser,
  updateUserByManager,
  deleteUser
};
