const { Project } = require("../models/project");
const { Subproject } = require("../models/subProject");
const { Client } = require("../models/client");

// add new project to project collection in the database
// add push this project to client's project list
const addProject = async (project) => {
  try {
    return await Project.create(project).then((p) => {
      addProjectToClient(p);
    });
  } catch (error) {
    console.log(error);
  }
};

//  push project to client's project list
const addProjectToClient = async (project) => {
  await Client.findByIdAndUpdate(
    project.clientId,
    { $push: { projects: project._id } },
    { new: true, useFindAndModify: false }
  );
};
//validator that check the unique project name
const checkProjectName = async (project) => {
  try {
    let projectName = project.projectName.trim();
    let client = project.clientId;
    let p = await Project.find({ projectName: projectName, clientId: client });
    if (p.length > 0) return true;
    return false;
  } catch (error) {
    console.log("in catch servise " + error);
  }
};
//get project from project collection by _id
const getProjectIdByName = async (projectName) => {
  try {
    return await Project.find({ projectName: projectName });
  } catch (error) {
    console.log("in catch servise " + error);
  }
};
//get all project collection from the database
const getProjects = async () => {
  try {
    return await Project.find({}).populate({
      path: "clientId",
      select: "clientName",
    });
  } catch (error) {
    console.log(error);
  }
};
//get all project thatt below to this client
const getProjectsByClient = async (clientId) => {
  try {
    return await Project.find({ clientId: clientId }, "projectName");
  } catch (error) {
    console.log(error);
  }
};

const getSubprojectList = async (projectId) => {
  try {
    return await Subproject.find({ projectId: projectId });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addProject,
  getProjects,
  getProjectIdByName,
  checkProjectName,
  getSubprojectList,
  getProjectsByClient,
};
