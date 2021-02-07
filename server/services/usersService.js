const { User } = require("../models/user");
const { Role } = require("../models/Role");
const { Client } = require("../models/client");
var bcrypt = require("bcryptjs");

//add new user to the users collection in the database
const createUser = async (newUser) => {
  try {
    const userCreated = await User.create(newUser);
    return userCreated;
  } catch (error) {
    console.log(error);
  }
};

//get roles collection from the database
const getRolesList = async () => {
  try {
    return await Role.find({});
  } catch (error) {
    console.log(error);
  }
};

//get users collection from the database with them roles
const getUsersList = async () => {
  try {
    return await User.find({}).populate({
      path: "roles",
      select: "description",
    });
  } catch (error) {
    console.log(error);
  }
};

//set user details by the mamager
const updateUserByManager = async (user) => {
  try {
    return await User.findByIdAndUpdate(user._id, {});
  } catch (error) {
    console.log(error);
  }
};

//update user details (profile_name,image) by the same user
const updateUser = async (userId, image, profileName, password) => {
  try {
    let user=new User({
          password:bcrypt.hashSync(password, 8)
    })
    user.profileName=profileName;
    user.image=image;
     let t= await User.findByIdAndUpdate(
      userId,
      { image: user.image, profileName: user.profileName, password: user.password ,isActive:true},
      { useFindAndModify: false }
    );
    // console.log("t",t);
    return t;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  getRolesList,
  getUsersList,
  updateUserByManager,
};
