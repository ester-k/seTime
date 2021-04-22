const { json } = require("body-parser");
const projectService = require("../services/projectService");
const addProject = async (req, res) => {
  try {
    const project = req.body;
    const addProject = await projectService.addProject(project);
    return res.status(200).json(addProject);
  } catch (err) {
    return res.status(500).send(err);
  }
};
const checkProjectName = async (req, res) => {
  try {
    const project = req.body;
    let checkProjectName = await projectService.checkProjectName(project);
    return res.status(200).json(checkProjectName);
  } catch (error) {
    console.log("error controller: " + error);
    return res.status(500).send("Internal Server Error");
  }
};
const getProjectIdByName = async (req, res) => {
  try {
    const projectName = req.params.projectName;
    const getProjectKey = await projectService.getProjectIdByName(projectName);
    return res.status(200).json(getProjectKey[0]._id);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getprojectMangers = async (req, res) => {
  try {
    const projectMangers = await projectService.getprojectMangers();
    return res.status(200).json(projectMangers);
  } catch (err) {
    return res.status(500).send("Internal Server Error ");
  }
};
const getProjects = async (req, res) => {
  try {
    const getProjects = await projectService.getProjects();
    return res.status(200).json(getProjects);
  } catch (err) {
    return res.status(500).send("Internal Server Error ");
  }
};
const getProjectsByClient = async (req, res) => {
  try {
    let client=req.params.client;
    let getProjects = await projectService.getProjectsByClient(client);
    return res.status(200).json(getProjects);
  } catch (err) {
    return res.status(500).send("Internal Server Error ");
  }
};




const getSubprojectList = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const subprojectList = await projectService.getSubprojectList(projectId);
    return res.status(200).json(subprojectList);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(subprojectList);
  }
};
module.exports = {
  addProject,
  getProjects,
  getProjectIdByName,
  checkProjectName,
  getprojectMangers,
  getSubprojectList,
  getProjectsByClient, 
};
