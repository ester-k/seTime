const router = require('express').Router();
const userController = require('../controllers/userController');
router.get('', userController.getUserList);
router.post('', userController.createUser);
router.get('/getRolesList',userController.getRolesList);
router.get('/getUserNameById/:id',userController.getUserNameById)
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  'C:/OurProject/seTime/server/uploads' }
);
router.post('/uploadImage',multipartMiddleware,userController.uploadImage)
module.exports = router;


