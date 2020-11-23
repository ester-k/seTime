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
        console.log("getProjectKey id controller try");
        const projectName = req.params.name
        console.log("project mame in controller " + projectName);
        const getProjectKey = await projectService.getProjectKey(projectName);
        console.log("key.key " + getProjectKey[0].key);
        return res.status(200).json(getProjectKey[0].key);
    } catch (err) {
        console.log("getProjectKey ib controller catch");
        return res.status(500).send("Internal Server Error");
    }
}
const checkProjectName = async (req, res) => {
    try {
        const projectName = req.params.name;
        console.log("project name " + projectName);
        let checkProjectName = await projectService.checkProjectName(projectName);
        console.log("return from service " + checkProjectName);
        return res.status(200).json(checkProjectName);


    } catch (error) {
        console.log("error controller: "+error);
        return res.status(500).send("Internal Server Error");

    }

}

module.exports = {
    addProject,
    getProjects,
    getProjectKey,
    checkProjectName
}