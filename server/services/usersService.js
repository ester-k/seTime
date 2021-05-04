const { User } = require("../models/user");
const { Role } = require("../models/Role");
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
// remove user from the users collection by authorized user
const deleteUser = async (user) => {
  try {
    console.log(user);
    return await User.deleteOne({_id: user._id.trim()});
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
      path: "role",
      select: "description",
    });
  } catch (error) {
    console.log(error);
  }
};
//set user details by the mamager (role and email adress)
const updateUserByManager = async (user) => {
  try {
      if (user.email == "")
           return await User.findByIdAndUpdate(user._id,{role: user.role },{ useFindAndModify: false }
      );
    if (user.role == "")
      return await User.findByIdAndUpdate(user._id,{ email: user.email },{useFindAndModify: false }
      );
    return await User.findByIdAndUpdate(
      "602e71977a681538d0b8c316",
      { role: user.role, email: user.email },
      { useFindAndModify: false }
    );
  } catch (error) {
    console.log(error);
  }
};
//update user details (profile_name,image) by the same user
const updateUser = async (userId, image, profileName, password) => {
  try {
    let user = new User({
      password: bcrypt.hashSync(password, 8),
    });
    user.profileName = profileName;
    user.image = image;
    let t = await User.findByIdAndUpdate(
      userId,
      {
        image: user.image,
        profileName: user.profileName,
        password: user.password,
        isActive: true,
      },
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
  deleteUser,
  updateUser,
  getRolesList,
  getUsersList,
  updateUserByManager,
};
