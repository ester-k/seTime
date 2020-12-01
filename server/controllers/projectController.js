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
const getProjects = async (req, res) => {
  try {
    const getProjects = await projectService.getProjects();
    return res.status(200).json(getProjects);
  } catch (err) {
    return res.status(500).send("Internal Server Error ");
  }
};

const getProjectIdByName = async (req, res) => {
  try {
    const projectName = req.params.projectName;
    const getProjectKey = await projectService.getProjectIdByName(projectName);
    return res.status(200).json(getProjectKey[0].__id);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
// const checkProjectName = async (req, res) => {
//   try {
//     // const projectName = req.params.projectName;
//     // console.log(projectName);
//     // const client = req.params.client;
//     // console.log(client);
//     const projectName = req.params.projectName;
//     // let checkProjectName = await projectService.checkProjectName(projectName,client);
//     let checkProjectName = await projectService.checkProjectName(projectName);
//     return res.status(200).json(checkProjectName);
//   } catch (error) {
//     console.log("error controller: " + error);
//     return res.status(500).send("Internal Server Error");
//   }
// };

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
  getSubprojectList,
};
