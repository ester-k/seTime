const { Work_week } = require("../models/work_week");
const { Project } = require("../models/project");
const task=require('./taskService');
const add = async (req) => {
  try {
    let duplecate=await Work_week.find({user:req.user,project:req.project,date:req.date});
      if(duplecate.length==0){
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
    return "לפרויקט זה אין משימות עבור";
    }
    else{
   
    return "פרויקט זה כבר משויך לעובד זה בתאריך זה"
  }
  } catch (error) {
    console.log("error",error);
  }
};
const getTodayProjects = async (d) => {
  try{
 let t= task.getAllTasks("today",d);
  // let date = new Date(d);
  // date.setHours(2, 0, 0, 0);
  // try {
  //   let t = await Work_week.find({
  //     date: date,
  //   })
  //     .populate({
  //       path: "project",
  //       match: { subprojects: { $exists: true, $not: { $size: 0 } } },
  //       select: "projectName _id clientId",
  //       populate: [
  //         {
  //           path: "clientId",
  //           select: "_id clientName",
  //         },
  //         {
  //           path: "subprojects",
  //           select: "_id subprojectName",
  //           populate: {
  //             path: "tasks",
  //           },
  //         },
  //       ],
  //     })
  //     .then(function (workWeek) {
  //       let with_subprojects = new Array();
  //       for (let w of workWeek) {
  //         if (w.project !== null) {
  //           // if(w.subprojects.tasks!=[])
  //           with_subprojects.push(w.project);
  //         }
  //       }
  //       return with_subprojects;
  //     });
       return t;
      
  } catch (error) {
    console.log(error);
  }
};
const getUserProjects = async (user) => {
  try{
let projects=await Work_week.find({user:user}).populate({path:"project",select:"projectName"});
console.log(projects,"projects");
return projects;
  }
  catch (error){
console.log(error);
  }
}
module.exports = {
  add,
  getTodayProjects,
  getUserProjects
};
