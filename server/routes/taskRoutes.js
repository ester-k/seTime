const router = require('express').Router();
const taskController = require('../controllers/taskController');
router.post('', taskController.createTask);
router.post('/completeTask', taskController.completeTask);

router.get('/dailyReport',taskController.dailyReport);
router.get('/getTasksByDate',taskController.getTasksByDate);
router.get('/:projectName',taskController.getTasks);
router.delete('/:id',taskController.deleteTask)
module.exports = router;


