const router = require('express').Router();
const userController = require('../controllers/userController');
router.get('', userController.getUserList);
router.post('', userController.createUser);
router.get('/getRolesList',userController.getRolesList);
router.get('/getUserNameById/:id',userController.getUserNameById)
router.post('/uploadImage',userController.uploadImage);
module.exports = router;


