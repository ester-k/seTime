const workWeek = require("../services/workWeekService");
const add = async (req, res) => {
  try {
    let week = await workWeek.add(req.body); //date: 2020-12-12T22:00:00.000Z,type:string
    return res.status(200).json(week);
  } catch (error) {
    return res.status(500).json(week);
  }
};

const getTodayProjects = async (req,res) => {
  try {
    let tasks = await workWeek.getTodayProjects(req.params.date);
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json(tasks);
  }
};
module.exports = {
  add,
  getTodayProjects
};
