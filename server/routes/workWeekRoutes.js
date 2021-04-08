const router = require('express').Router();
const workWeekController=require('../controllers/workWeekController');
router.post('/add',workWeekController.add)
router.get('/getTodayProjects/:date',workWeekController.getTodayProjects)
router.get('/getUserProjects/:user',workWeekController.getUserProjects)

module.exports=router;