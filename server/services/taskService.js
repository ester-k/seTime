const project = require("../models/project");
const task = require("../models/task");
const { Task } = require("../models/task");
const { TaskType } = require("../models/taskType");
const { Status } = require("../models/status");
const { FaultType } = require("../models/faultType");
const { Client } = require("../models/client");
const { Priority } = require("../models/priority");
const { Subproject } = require("../models/subProject");

const createTask = async (task) => {
  try {
    return (createdTask = await Task.create(task));
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
    return await Task.find({ startDate: date });
  } catch (error) {
    console.log(error);
  }
};
async function getAllTask() {
  try {
    return await Task.find({});
  } catch (error) {
    console.log(error);
  }
}
const getWeeklyTask = async () => {
  try {
    let currentWeekNum = getWeekNumber(new Date());
    let week = [];
    let weeklyTasks = [];
    let allTasks = await Task.find({});
    for (let i = 0; allTasks[i]; i++) {
      week = getWeekNumber(allTasks[i].dueDate);
      if (week[0] == currentWeekNum[0] && week[1] == currentWeekNum[1]) {
        weeklyTasks.push(allTasks[i]);
      }
    }
    return weeklyTasks;
  } catch (error) {
    console.log(error);
  }
};
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  console.log("new date:");
  console.log(d);
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

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
const getPriorityList = async () => {
  try {
    return await Priority.find({});
  } catch (error) {
    console.log(error);
  }
};

const getFaultTypeList = async () => {
  try {
    const faultType = new FaultType();
    return await FaultType.find({});
  } catch (error) {
    console.log(error);
  }
};
const getTaskTypeList = async () => {
  try {
    return await TaskType.find({});
  } catch (error) {
    console.log(error);
  }
};

const getClientList = async () => {
  try {
    let clients = await Client.find({});
    return clients;
  } catch (error) {
    console.log(error);
  }
};
const getStatusList = async () => {
  try {
    return await Status.find({});
  } catch (error) {
    console.log(error);
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
  getWeeklyTask,
};
