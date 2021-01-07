const express = require("express");
const router = require("express").Router();
const multer = require('multer');
const { Gallery } = require("../models/client");
const userController = require("../controllers/userController");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      console.log("file",file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});
router.get("", userController.getUserList);
router.post("", userController.createUser);
router.get("/getRolesList", userController.getRolesList);
router.get("/getUserNameById/:id", userController.getUserNameById);
router.post('/uploadImage', upload.single('file'), function(req, res, next) {
    console.log("here:)");
    if(!req.file) {
        return res.status(500).send({ message: 'Upload fail'});
    } else {
        req.body.imageUrl = '..../server/uploads/' + req.file.filename;
        Gallery.create(req.body, function (err, gallery) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(gallery);
        });
    }
});
module.exports = router;
// var fs = require("fs");
// var path = require("path");
// require("dotenv/config");
// const multipart = require("connect-multiparty");


// const multipartMiddleware = multipart({
//     uploadDir: "C:/OurProject/seTime/server/uploads",
//   });
  
  // var storage = multer.diskStorage({
  //     destination: (req, file, cb) => {
  //         cb(null, 'uploads')
  //     },
  //     filename: (req, file, cb) => {
  //         cb(null, file.fieldname + '-' + Date.now())
  //     }
  // });
  
  // var upload = multer({ storage: storage });
  
  // router.post("/uploadImage", multipartMiddleware, (req, res) => {
  //   console.log("req.files.img.path", req.files.img.path);
  // //   const data=fs.readFileSync(req.files.img.path)
  // //   userController.uploadImage(data)
  //   const image = {
  //     "name": String,
  //     "desc": String,
  //     'img': {
  //       "data": Buffer,
  //       "contentType": String,
  //     },
  //   };
  //   image.name= req.body.name,
  //   image.desc= req.body.desc,
  //   image.img= {
  //       data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //       contentType: 'image/png'
  //   }
  //   return res.status(200).json(image.img.data.toString('base64'));
  // });