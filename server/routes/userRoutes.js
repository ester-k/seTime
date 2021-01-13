const router = require("express").Router();
const multer = require('multer');
const userController = require("../controllers/userController");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log("file",file);
      cb(null, file.originalname );
    }
});
var upload = multer({storage: storage});
router.get("", userController.getUserList);
router.post("", userController.createUser);
router.get("/getRolesList", userController.getRolesList);
router.get("/getUserNameById/:id", userController.getUserNameById);
router.post('/uploadImage', upload.single('file'),userController.uploadImage); 
router.post('updateUser',userController.updateUser);
module.exports = router;
