const { Work_week } = require("../models/work_week");
const { Project } = require("../models/project");
const task = require("./taskService");
const add = async (req) => {
  try {
    var userHaveTask = { error: true, massage: "" };
    let duplecate = await Work_week.find({
      user: req.user,
      project: req.project,
      date: req.date,
    });
    if (duplecate.length == 0) {
      let projectWeek = await Work_week.create(req);
      let user = projectWeek.user;
      let project = projectWeek.project;
      await Project.findById(project)
        .populate({
          path: "subprojects",
          select: "tasks ",
          populate: { path: "tasks", select: "userId" },
        })
        .then((result) => {
          result = JSON.parse(JSON.stringify(result));
          if (result)
            for (let subproject of result.subprojects) {
              for (let task of subproject.tasks) {
                if (task.userId == user) userHaveTask.error = null;
              }
            }
        });
      if (userHaveTask.error == true) {
        userHaveTask.massage = "לפרויקט זה אין משימות עבור";
      }
    }
    if (duplecate.length > 0) {
      userHaveTask.error = false;
      userHaveTask.massage = "פרויקט זה כבר משויך לעובד זה בתאריך זה";
    }
    return userHaveTask;
  } catch (error) {
    console.log("error", error);
  }
};
const deleteProject = async (project) => {
  try {
        return await Work_week.deleteOne({
      project: project.projectId,
      date: project.date,
    });
   } catch (error) {
    console.log("service", error);
  }
};
const getTodayProjects = async (date, user) => {
  try {
    return await task.getAllTasks("today", date, user);
  } catch (error) {
    console.log("service", error);
  }
};
const getUserProjects = async (user) => {
  try {
    return await Work_week.find({ user: user }).populate({
      path: "project",
      select: "projectName",
    });
    } catch (error) {
    console.log(error);
  }
};
module.exports = {
  add,
  deleteProject,
  getTodayProjects,
  getUserProjects,
};
