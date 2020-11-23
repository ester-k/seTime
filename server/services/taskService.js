const project = require("../models/project");
const task = require("../models/task");
const { Task } = require("../models/task");
const createTask = async (task) => {
  try {
    return createdTask = await Task.create(task);
  } catch (error) {
    console.log(error);
  }
};
const getTasksByProject = async (projectName) => {
  try {
    return await Task.find({ projectKey: projectName, isComplete: false });
  } catch (error) {
    console.log(error);
  }
};
const getTasksByDate = async () => {
  try {
    let date = new Date();
    date.setHours(2, 0, 0, 0);
    console.log(date);
    let getTasksByDate = await Task.find({startDate: date});
    return getTasksByDate;
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async (taskId) => {
  try {
    return await Task.deleteOne({ _id: taskId });
  } catch (error) {
    console.log(error);
  }
};
const completeTask = async (taskId) => {
  try {
    let filter = { _id: taskId };
    let update = { isComplete: true };
    let task = await Task.findOneAndUpdate(filter, update, {
      new: false,
      upsert: false,
    });
  } catch (error) {
    console.log(error);
  }
};
const dailyReport = async (req, res) => {
  let allTasks = getTasksByDate();
  notCompleteTsks = (await allTasks).filter((t) => t.isComplete == false);
};
module.exports = {
  createTask,
  getTasksByProject,
  getTasksByDate,
  deleteTask,
  completeTask,
  dailyReport,
};
