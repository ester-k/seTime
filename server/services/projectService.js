const { Project } = require("../models/project");
const addProject = async (project) => {
  try {
    const createdProject = await Project.create(project);
    console.log("project created" + project);
    return createdProject;
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
const getProjectKey = async (projectName) => {
  try {
    console.log(projectName);
    return await Project.find({ name: projectName });
  } catch (error) {
    console.log("in catch servise " + error);
  }
};
const checkProjectName = async (projectName) => {
  try {
    console.log("in service " + projectName);
    const p = await Project.find({ name: projectName.trim() });
    const c = await Project.find({});
console.log(c);
    console.log("p: ");
    console.log(p);
    if (p != "") return true;
    return false;
  } catch (error) {
    console.log("in catch servise " + error);
  }
};
module.exports = {
  addProject,
  getProjects,
  getProjectKey,
  checkProjectName,
};
