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
const getProjectIdByName = async (projectName) => {
  try {
    console.log(projectName);
    return await Project.find({ projectName: projectName });
  } catch (error) {
    console.log("in catch servise " + error);
  }
};
const checkProjectName = async (projectName) => {
  try {
    console.log("in service " + projectName);
    let p = await Project.find({ name: projectName.trim() });
    console.log("p: ");
    console.log(p);
    if (p.length > 0) return true;
    return false;
  } catch (error) {
    console.log("in catch servise " + error);
  }
};
const getSubprojectList = async (projectId) => {
  try {
    return await Subproject.find({projectId: projectId});
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

};
