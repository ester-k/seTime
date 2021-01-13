const { User } = require("../models/user");
const { Role } = require("../models/Role");
const { Client } = require("../models/client");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const createUser = async (newUser) => {
  try {
    const userCreated = await User.create(newUser);
    return userCreated;
  } catch (error) {
    console.log(error);
  }
};
const getRolesList = async () => {
  try {
    return await Role.find({});
  } catch (error) {
    console.log(error);
  }
};
const getUserList = async () => {
  try {
    return await User.find({}).populate({
      path: "roles",
      select: "description",
    });
  } catch (error) {
    console.log(error);
  }
};
const getUserNameById = async (id) => {
  try {
    console.log(id);
    return await Client.find({ _id: id });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (user) => {
  try {
    console.log(user);
    return await User.findByIdAndUpdate(user._id, {});
  } catch (error) {
    console.log(error);
  }
};
const uploadImage = async (userId, image, profileName, password) => {
  try {
    console.log("id",userId);

    let user=new User({
          password:bcrypt.hashSync(password, 8)
    })
    user.profileName=profileName;
    // user.password=password;
    user.image=image;
    let t = await User.findByIdAndUpdate(
      userId,
      { image: user.image, profileName: user.profileName, password: user.password ,isActive:true},
      { useFindAndModify: false }
    );
    console.log("t", t);
    return t;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  uploadImage,
  getRolesList,
  getUserList,
  getUserNameById,
  updateUser,
};
