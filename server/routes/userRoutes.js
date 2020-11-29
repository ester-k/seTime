const router = require('express').Router();
const usersController = require('../controllers/userController');
router.get('', usersController.getUser);
router.post('', usersController.createUser);
router.get('/getRolesList',userController.getRolesList);

module.exports = router;


