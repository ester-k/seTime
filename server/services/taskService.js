const { Task } = require("../models/task");
const { TaskType } = require("../models/taskType");
const { Status } = require("../models/status");
const { FaultType } = require("../models/faultType");
const { Subproject } = require("../models/subProject");
const { Client } = require("../models/client");
const { Priority } = require("../models/priority");
const { Project } = require("../models/project");

const addTaskToSubproject = async (task) => {
  await Subproject.findByIdAndUpdate(
    task.subprojectId,
    { $push: { tasks: task._id } },
    { new: true, useFindAndModify: false }
  );
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
const createTask = async (task) => {
  try {
    let createdTask = await Task.create(task);
    addTaskToSubproject(createdTask);
    return createdTask;
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
//get task collection from the database with status filter
const getAllTasks = async (filter) => {
  try {
    let currentRole = localStorage.getItem("role");
    console.log("current role", currentRole);
    switch (filter) {
      case "all":
        if (currentRole == "מנהל")
          var tasks = await Project.find({ subprojects: { $ne: [] } }).populate(
            {
              path: "subprojects",
              select: "tasks ",
              match: { task: { $ne: [] } },
              populate: {
                path: "tasks",
                populate: { path: "userId", select: "username" },
              },
            }
          );
        else
          var tasks = await Project.find({ subprojects: { $ne: [] } }).populate(
            {
              path: "subprojects",
              select: "tasks ",
              match: { task: { $ne: [] } },
              populate: {
                path: "tasks",
                populate: { path: "createdBy", select: "username" },
              },
            }
          );
        break;
      case "open":
        if (currentRole == "מנהל")
          var tasks = await Project.find({ subprojects: { $ne: [] } }).populate(
            {
              path: "subprojects",
              select: "tasks ",
              match: { task: { $ne: [] } },
              populate: {
                path: "tasks",
                match: { status: { $ne: "מושהה" } },
                populate: { path: "userId", select: "username" },
              },
            }
          );
        else
          var tasks = await Project.find({ subprojects: { $ne: [] } }).populate(
            {
              path: "subprojects",
              select: "tasks ",
              match: { task: { $ne: [] } },
              populate: {
                path: "tasks",
                match: { status: { $ne: "מושהה" } },
                populate: { path: "createdBy", select: "username" },
              },
            }
          );
      default:
        break;
    }
      return tasks;
  } catch (error) {
    console.log(error);
  }
};
const getTasksByDate = async () => {
  try {
    let date = new Date();
    date.setHours(2, 0, 0, 0);
    return await Task.find({ dueDate: date, isComplete: false });
  } catch (error) {
    console.log(error);
  }
};
const getTasksByProject = async (projectId) => {
  try {
    return await Task.find({
      projectId: projectId,
      isComplete: false,
    }).populate({ path: "users", select: "username" });
  } catch (error) {
    console.log(error);
  }
};
const getWeeklyTask = async () => {
  try {
    let currentWeekNum = getWeekNumber(new Date());
    let week = [];
    let weeklyTasks = [];
    let allTasks = await Task.find({ isComplete: false });
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
  getAllTasks,
};
