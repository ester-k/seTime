const router = require('express').Router();
const userController = require('../controllers/userController');
router.get('', userController.getUserList);
router.post('', userController.createUser);
router.get('/getRolesList',userController.getRolesList);
router.get('/getUserNameById/:id',userController.getUserNameById)
module.exports = router;


