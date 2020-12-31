const { Work_week } = require("../models/work_week");
const { Client } = require("../models/client");
const { Project } = require("../models/project");

const add = async (req) => {
  try {
   let projectWeek= await Work_week.create(req); //date:  2020-12-13T00:00:00.000Z,
    let user = projectWeek.user;
    let project = projectWeek.project;
    console.log("projectWeek", projectWeek);
    console.log("project", project);
    let userHaveTask=false;
     await Project.findById(project)
      .populate({
        path: "subprojects",
        select: "tasks ",
        populate:{ path:"tasks" ,select:'userId'}
      })
      .then((result) => {
        console.log("***");
        result=JSON.parse(JSON.stringify(result));
        console.log(result.subprojects);
        for (let subproject of result.subprojects) {
          for(let task of subproject.tasks) {
          console.log(task);
          if (task.userId==user) userHaveTask= true;
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
        //האם זה נכון שאני רוצה לשלוף רק פרויקטים שיש להם משימות?
      })
      .then(function (workWeek) {
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
