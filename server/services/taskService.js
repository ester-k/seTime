const project = require("../models/project");
const task = require("../models/task");
const { Task } = require("../models/task");
const createTask = async (task) => {
  try {
    const createdTask = await Task.create(task);
    console.log(task);
    return createdTask;
  } catch (error) {
    console.log(error);
  }
};
const getTasks = async (projectName) => {
  try {
    return await Task.find({ projectKey: projectName });
  } catch (error) {
    console.log(error);
  }
};
const getTasksByDate = async () => {
  try {
    //  const date = new Date(Date.now()).toLocaleDateString();
    let date = new Date();
    date.setHours(2, 0, 0, 0);
    console.log(date);
    //console.log(startDate)
    return await Task.find({ startDate: date });
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async (taskId) => {
  try {
    console.log("in service"+taskId);
    return await Task.deleteOne({ _id: taskId });
  } catch (error) {
    console.log(error);
  }
};
const completeTask= async (taskId)=>{
  try {
    return await Task.updateOne({ _id: taskId },{$set:{isComplete:true}});
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createTask,
  getTasks,
  getTasksByDate,
  deleteTask,
  completeTask
};
