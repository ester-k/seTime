const router = require("express").Router();
const userController = require("../controllers/userController");
const multer = require('multer');
const { user } = require("../models");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../client/src/assets/img');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname );
    }
});
var upload = multer({storage: storage});
router.post('/updateUser', upload.single('file'),userController.updateUser); 
router.get("", userController.getUsersList);
router.post("", userController.createUser);
router.get("/getRolesList", userController.getRolesList);
router.get("/getUserNameById/:id", userController.getUserNameById);
router.post('updateUserByManager',userController.updateUserByManager);
router.delete('/deleteUser',userController.deleteUser)
module.exports = router;
