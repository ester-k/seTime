const { Client } = require("../models/client");
const { Subproject } = require("../models/subProject");
const { Project } = require("../models/project");

const addClient = async (client) => {
  try {
          return Client.create(client)
      
    
  } catch (error) {
    console.log(error);
  }
};

const addSubproject = async (subproject) => {
  try {
     let sub= await Subproject.create(subproject);
     addSubprojectToProject(sub);
     return sub;
  } catch (error) {
    console.log(error);
  }
};
const addSubprojectToProject = async (subproject) => {
  await Project.findByIdAndUpdate(
    subproject.projectId,
    { $push: { subprojects: subproject._id } },
    { new: true, useFindAndModify: false }
  );
};
module.exports = {
    addClient,
    addSubproject,
    
}