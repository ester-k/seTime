const { User } = require('../models/user');
const { Role } = require('../models/Role');
const  {Client}  = require('../models/client');

const createUser = async (newUser) => {
    try {
        const userCreated = await User.create(newUser);
        return userCreated;
    } catch (error) {
        console.log(error);
    }
}
const getRolesList = async () => {
    try {
      return await Role.find({});
    } catch (error) {
      console.log(error);
    }
  };
  const getUserList = async () => {
    try {
      return await User.find({});
    } catch (error) {
      console.log(error);
    }
  };
  const  getUserNameById = async (id) => {
    try {
      console.log(id);
      return await Client.find({_id: id});
    } catch (error) {
      console.log(error);
    }
  };
  const  uploadImage = async (image) => {
    try {
      console.log("here");
      console.log(image);
      //User.craete is not a function
      return await User.craete(image);
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
    
}
