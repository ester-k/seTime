const router = require("express").Router();
const multer = require('multer');
const userController = require("../controllers/userController");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../client/src/assets/img');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname );
    }
});
var upload = multer({storage: storage});
router.get("", userController.getUsersList);
router.post("", userController.createUser);
router.get("/getRolesList", userController.getRolesList);
router.get("/getUserNameById/:id", userController.getUserNameById);
router.post('/updateUser', upload.single('file'),userController.updateUser); 
router.post('updateUserByManager',userController.updateUserByManager);
module.exports = router;
