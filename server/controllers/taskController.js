const project = require("../models/project");
const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const task = req.body;
    const createTask = await taskService.createTask(task);
    return res.status(200).json(createdUser);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getTasks = async (req, res) => {
  try {
    const projectName = req.params.projectName;
    const getTasks = await taskService.getTasks(projectName);
    return res.status(200).json(getTasks);
  } catch (error) {
    return res.status(200).json(getTasks);
  }
};
const getTasksByDate = async (req, res) => {
  try {
    console.log("controller");
    const getTasksByDate = await taskService.getTasksByDate();
    //console.log("tasks: "+getTaskByDate);
    return res.status(200).json(getTasksByDate);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(getTasksByDate);
  }
};
const deleteTask = async (req,res) => {
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
const completeTask= async (req, res) => {
const taskId=req.body;
try {
  const completeTask = await taskService.completeTask(taskId);
    return res.status(200).json(completeTask);
  } catch (error) {
    console.log("error in controller: " + error);
    return res.status(200).json(completeTask);
  }
}
module.exports = {
  createTask,
  getTasks,
  getTasksByDate,
  deleteTask,
  completeTask
};
