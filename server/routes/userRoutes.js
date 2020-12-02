const router = require('express').Router();
const userController = require('../controllers/userController');
router.get('', userController.getUserList);
router.post('', userController.createUser);
router.get('/getRolesList',userController.getRolesList);

module.exports = router;


