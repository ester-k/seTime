const { json } = require('body-parser');
const projectService = require('../services/projectService')
const addProject = async (req, res) => {
    try {
        const project = req.body
        const addProject = await projectService.addProject(project)
        return res.status(200).json(addProject);
    }
    catch (err) {
        return res.status(500).send(err);
    }
}
const getProjects = async (req, res) => {
    try {
        const getProjects = await projectService.getProjects();
        return res.status(200).json(getProjects);
    } catch (err) {
        return res.status(500).send("Internal Server Error ");
    }
}

const getProjectKey = async (req, res) => {

    try {
        const projectName = req.params.name
        const getProjectKey = await projectService.getProjectKey(projectName);
        return res.status(200).json(getProjectKey[0].key);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}
const checkProjectName = async (req, res) => {
    try {
        const projectName = req.params.name;
        let checkProjectName = await projectService.checkProjectName(projectName);
        return res.status(200).json(checkProjectName);


    } catch (error) {
        console.log("error controller: "+error);
        return res.status(500).send("Internal Server Error");

    }

}
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
    getProjectKey,
    checkProjectName,
    getSubprojectList
}