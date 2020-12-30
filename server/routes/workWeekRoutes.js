console.log('hi');
const router = require('express').Router();
const workWeekController=require('../controllers/workWeekController');
router.post('/add',workWeekController.add)
router.get('/getTodayProjects/:date',workWeekController.getTodayProjects)

module.exports=router;