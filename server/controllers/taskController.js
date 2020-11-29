const project = require("../models/project");
const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const task = req.body;
    const createTask = await taskService.createTask(task);
    return res.status(200).json(createTask);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getTasksByProject = async (req, res) => {
  try {
    const projectName = req.params.projectName;
    const getTasksByProject = await taskService.getTasksByProject(projectName);
    return res.status(200).json(getTasksByProject);
  } catch (error) {
    return res.status(200).json(getTasksByProject);
  }
};
const getTasksByDate = async (req, res) => {
  try {
    const getTasksByDate = await taskService.getTasksByDate();
    return res.status(200).json(getTasksByDate);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(getTasksByDate);
  }
};
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(taskId);
    const deleteTask = await taskService.deleteTask(taskId);
    return res.status(200).json(deleteTask);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(deleteTask);
  }
};
const completeTask = async (req, res) => {
  const taskId = req.body.id;
  console.log(taskId);

  try {
    const completeTask = await taskService.completeTask(taskId);
    return res.status(200).json(completeTask);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(completeTask);
  }
};
const dailyReport = async (req, res) => {
  try {
    const allTasks = await taskService.dailyReport();
        return res.status(200).json(allTasks);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(allTasks);
  }
};
const getPriorityList = async (req, res) => {
  try {
    const PriorityList = await taskService.getPriorityList();
    console.log("controller");
    console.log(PriorityList);
    return res.status(200).json(PriorityList);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(PriorityList);
  }
};
const getStatusList = async (req, res) => {
  try {
    const statusList = await taskService.getStatusList();
    return res.status(200).json(statusList);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(statusList);
  }
};
const getTaskTypeList = async (req, res) => {
  try {
    const taskTypeList = await taskService.getTaskTypeList();
    return res.status(200).json(taskTypeList);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(taskTypeList);
  }
};
const getFaultTypeList = async (req, res) => {
  try {
    const faultTypeList = await taskService.getFaultTypeList();
    return res.status(200).json(faultTypeList);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(faultTypeList);
  }
};
const getClientList = async (req, res) => {
  try {
    const clientList = await taskService.getClientList();
    return res.status(200).json(clientList);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(clientList);
  }
};
const getSubprojectList = async (req, res) => {
  try {
    const subprojectList = await taskService.getSubprojectList();
    return res.status(200).json(subprojectList);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(subprojectList);
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  getTasksByDate,
  deleteTask,
  completeTask,
  dailyReport,
  getPriorityList,
  getStatusList,
  getTaskTypeList,
  getFaultTypeList,
  getClientList,
  getSubprojectList,
 
};
