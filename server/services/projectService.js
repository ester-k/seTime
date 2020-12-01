const { Project } = require("../models/project");
const { Subproject } = require("../models/subProject");

const addProject = async (project) => {
  try {
    return await Project.create(project);
  } catch (error) {
    console.log(error);
  }
};
const getProjects = async () => {
  try {
        return await Project.find({});
      } catch (error) {
    console.log(error);
  }
};
const getProjectsByClient = async (client) => {
  try {
    return await Project.find({clientId:client});
      } catch (error) {
    console.log(error);
  }
};
const getProjectIdByName = async (projectName) => {
  try {
    return await Project.find({ projectName: projectName });
  } catch (error) {
    console.log("in catch servise " + error);
  }
};
//const checkProjectName = async (projectName,client) => {
// const checkProjectName = async (projectName) => {
//   try {
//    let p = await Project.find({ name: projectName.trim() ,client:clientId});
//     let p = await Project.find({ name: projectName.trim() });
//     if (p.length > 0) return true;
//     return false;
//   } catch (error) {
//     console.log("in catch servise " + error);
//   }
// };

const checkProjectName = async (project) => {
  try {
    let projectName = project.projectName;
    let client = project.clientId;
    console.log(projectName);
    let p = await Project.find({ name: projectName.trim(), clientId: client });
    if (p.length > 0) return true;
    return false;
  } catch (error) {
    console.log("in catch servise " + error);
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
  getProjectsByClient
};
