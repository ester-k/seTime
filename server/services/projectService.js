const { Project } = require("../models/project");
const { Subproject } = require("../models/subProject");
const { Client } = require("../models/client");

const addProject = async (project) => {
  try {
    return await Project.create(project).then((p) => {
      addProjectToClient(p);
    });
  } catch (error) {
    console.log(error);
  }
};
const getProjects = async () => {
  try {
    return await Project.find({}).populate({path: 'clientId',select:'clientName'});
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
const addProjectToClient = async (project) => {
  await Client.findByIdAndUpdate(
    project.clientId,
    { $push: { projects: project._id } },
    { new: true, useFindAndModify: false }
  );
};

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

const getSubprojectList = async (projectId) => {
  try {
    return await Subproject.find({ projectId: projectId });
  } catch (error) {
    console.log(error);
  }
};
const getProjectsByClient = async(clientId)=>{
  let t=await Client.findById(clientId,'projects').populate({path: "projects",select:"projectName _id"});
  console.log("t", t.projects)
   return t.projects;

}

module.exports = {
  addProject,
  getProjects,
  getProjectIdByName,
  checkProjectName,
  getSubprojectList,
  getProjectsByClient,
  // getProjectsClient,
};
