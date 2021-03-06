const workWeek = require("../services/workWeekService");
const add = async (req, res) => {
  try {
    let week = await workWeek.add(req.body); //date: 2020-12-12T22:00:00.000Z,type:string
    return res.status(200).json(week);
  } catch (error) {
    return res.status(500).json(week);
  }
};
const deleteProject = async (req, res) => {
  try {
    let deleted = await workWeek.deleteProject(req.body); 
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(week);
  }
}
const getTodayProjects = async (req,res) => {
  try {
    let tasks = await workWeek.getTodayProjects(req.body.date,req.body.user);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(tasks);
  }
};
const getUserProjects = async (req,res) => {
  try {
    let projects = await workWeek.getUserProjects(req.params.user);
    return res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    return res.status(500).json(projects);
  }
};


module.exports = {
  add,
  deleteProject,
  getTodayProjects,
  getUserProjects
};
