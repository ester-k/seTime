const router = require("express").Router();
const taskController = require("../controllers/taskController");
router.post("", taskController.createTask);
router.post("/completeTask", taskController.completeTask);
router.get("/dailyReport", taskController.dailyReport);
router.get("/getTasksByDate", taskController.getTasksByDate);
router.get("/getTasksByProject/:projectName", taskController.getTasksByProject);
router.delete("/:id", taskController.deleteTask);
router.get("/getStatusList", taskController.getStatusList);
router.get("/getPriorityList", taskController.getPriorityList);
router.get("/getTaskTypeList", taskController.getTaskTypeList);
router.get("/getFaultTypeList", taskController.getFaultTypeList);
router.get("/getClientList", taskController.getClientList);
router.get("/getWeeklyTask", taskController.getWeeklyTask);
router.get("/sendEmail", taskController.sendEmail);

module.exports = router;
