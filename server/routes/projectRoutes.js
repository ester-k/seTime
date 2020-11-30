const router = require('express').Router();
const projectController = require('../controllers/projectController');
router.post('/addProject', projectController.addProject);
router.get('/getProjects', projectController.getProjects);
router.get('/checkProjectName/:name',projectController.checkProjectName);
router.get('/getSubprojectList/:projectId',projectController.getSubprojectList);
router.get('/getProjectIdByName/:projectName',projectController.getProjectIdByName);

module.exports = router;


