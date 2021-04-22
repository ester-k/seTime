const router = require('express').Router();
const workWeekController=require('../controllers/workWeekController');
router.post('/add',workWeekController.add)
router.post('/getTodayProjects',workWeekController.getTodayProjects)
router.get('/getUserProjects/:user',workWeekController.getUserProjects)
router.post('/deleteProject',workWeekController.deleteProject)
module.exports=router;