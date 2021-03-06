const { Task } = require("../models/task");
const { TaskType } = require("../models/taskType");
const { Status } = require("../models/status");
const { FaultType } = require("../models/faultType");
const { Subproject } = require("../models/subProject");
const { Client } = require("../models/client");
const { Priority } = require("../models/priority");
const { Project } = require("../models/project");
const { Work_week } = require("../models/work_week");

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
    console.log(createdTask);
    return createdTask;
  } catch (error) {
    console.log(error);
  }
};
const dailyReport = async (req, res) => {
  let allTasks = getTasksByDate();
  notCompleteTsks = (await allTasks).filter((t) => t.isComplete == false);
};
const deleteTask = async (taskId) => {
  try {
    return await Task.deleteOne({ _id: taskId });
  } catch (error) {
    console.log(error);
  }
};
//get task collection from the database with status filter
const getAllTasks = async (filter, d, user) => {
  try {
    let currentRole = localStorage.getItem("role");
    let userId = localStorage.getItem("user");
    switch (filter) {
      case "today":                       
        let date = new Date(d);
        date.setHours(2, 0, 0, 0);
        let t = await Work_week.find({
          user: user,
          date: date,
        })
          .populate({
            path: "project",
            match: { subprojects: { $ne: [] } },
            select: "projectName _id clientId",
            populate: [
              { path: "clientId", select: "_id clientName" },
              {
                path: "subprojects",
                select: "_id subprojectName",
                match: { tasks: { $ne: [] } },
                populate: { path: "tasks" },
              },
            ],
          })
          .then(function (workWeek) {
            let with_subprojects = new Array();
            for (let w of workWeek) {
              if (w.project !== null) {
                for (let sub of w.project.subprojects) {
                  if (sub.tasks.length > 0) with_subprojects.push(w.project);
                }
              }
            }
            return with_subprojects;
          });

        tasks = t;
        break;
      case "all":
        if (currentRole == "מנהל")
          var tasks = await Project.find({ subprojects: { $ne: [] } })
            .populate({
              path: "subprojects",
              select: "tasks ",
              match: { task: { $ne: [] } },
              populate: {
                path: "tasks",
                populate: {
                  path: "userId",
                  select: "username",
                  match: { userId: userId },
                },
              },
            })
            .populate({ path: "clientId", select: "clientName" });
            if (currentRole == "מנהל פרויקטים"){
            var tasks = await Project.find({ subprojects: { $ne: [] } ,projectManager:userId})
              .populate({
                path: "subprojects",
                select: "tasks ",
                match: { task: { $ne: [] } },
                populate: {
                  path: "tasks",
                  populate: {
                    path: "userId",
                    select: "username",
                    match: { userId: userId },
                  },
                },
              })
              .populate({ path: "clientId", select: "clientName" });}
            else
          var tasks = await Project.find({ subprojects: { $ne: [] } })
            .populate({
              path: "subprojects",
              select: "tasks ",
              match: { task: { $ne: [] } },
              populate: {
                path: "tasks",
                match: { userId: userId },
                populate: { path: "createdBy", select: "username" },
              },
            })
            .populate({ path: "clientId", select: "clientName" });
          
        break;
      case "open":
        if (currentRole == "מנהל")
          var tasks = await Project.find({ subprojects: { $ne: [] } })
            .populate({
              path: "subprojects",
              select: "tasks ",
              match: { task: { $ne: [] } },
              populate: {
                path: "tasks",
                match: { status: { $ne: "מושהה" } , userId: userId },
                populate: { path: "userId", select: "username" },
              },
            })
            .populate({ path: "clientId", select: "clientName" });
            if (currentRole == "מנהל פרויקטים"){
              var tasks = await Project.find({ subprojects: { $ne: [] } ,projectManager:userId})
                .populate({
                  path: "subprojects",
                  select: "tasks ",
                  match: { task: { $ne: [] } },
                  populate: {
                    path: "tasks",
                    populate: {
                      path: "userId",
                      select: "username",
                      // match: { userId: userId },
                    },
                  },
                })
                .populate({ path: "clientId", select: "clientName" });}
        else
        {
          let ta=await Task.find({status: { $ne: "מושהה" } , userId: userId});
          var tasks = await Project.find({ subprojects: { $ne: [] } })
          .populate({
            path: "subprojects",
            select: "tasks ",
            match: { task: { $ne: [] } },
            populate: {
              path: "tasks",
              match: { status: { $ne: "מושהה" }, userId: userId },
              populate: { path: "createdBy", select: "username" },
            },
          })
          .populate({ path: "clientId", select: "clientName" });
        }
        
        break;
      default:
        break;
    }
    return tasks;
  } catch (error) {
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
const getPriorityList = async () => {
  try {
    return await Priority.find({});
  } catch (error) {
    console.log(error);
  }
};
const getFaultTypeList = async () => {
  try {
    return await FaultType.find({});
  } catch (error) {
    console.log(error);
  }
};
const getTaskTypeList = async () => {
  try {
   let t= await TaskType.find({}).then(result =>{ return result}); return t
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
