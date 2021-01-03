const { Work_week } = require("../models/work_week");
// const { Client } = require("../models/client");
const { Project } = require("../models/project");

const add = async (req) => {
  try {
       let projectWeek = await Work_week.create(req);
       let user = projectWeek.user;
    let project = projectWeek.project;
    let userHaveTask = false;
    await Project.findById(project)
      .populate({
        path: "subprojects",
        select: "tasks ",
        populate: { path: "tasks", select: "userId" },
      })
      .then((result) => {
        result = JSON.parse(JSON.stringify(result));
        for (let subproject of result.subprojects) {
          for (let task of subproject.tasks) {
            if (task.userId == user) userHaveTask = true;
          }
        }
      });
    return userHaveTask;
  } catch (error) {
    console.log(error);
  }
};
const getTodayProjects = async (d) => {
  let date = new Date(d);
  date.setHours(2, 0, 0, 0);
    try {
    let t = await Work_week.find({
      date: date,
    })
      .populate({
        path: "project",
        match: { subprojects: { $exists: true, $not: { $size: 0 } } },
        select: "projectName _id clientId",
        populate: [
          {
            path: "clientId",
            select: "_id clientName",
          },
          {
            path: "subprojects",
            select: "_id subprojectName",
            populate: {
              path: "tasks",
            },
          },
        ],
      })
      .then(function (workWeek) {
        console.log("work week", workWeek);
        let with_subprojects = new Array();
        for (let w of workWeek) {
          if (w.project !== null) {
            // if(w.subprojects.tasks!=[])
            console.log("w", w);
            with_subprojects.push(w);
          }
        }
        return with_subprojects;
      });
    return t;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  add,
  getTodayProjects,
};
