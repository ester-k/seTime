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
      let id="5ff20de791f94f3b189cec04";
      console.log("here service");
      console.log(image,"type",typeof image);
      //User.craete is not a function
           return await User.findByIdAndUpdate(id,{image:image},  { new: true, useFindAndModify: false });
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
