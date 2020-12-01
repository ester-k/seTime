const router = require("express").Router();
const managerController = require("../controllers/managerController");
router.post("/addClient", managerController.addClient);
router.post("/addSubproject", managerController.addSubproject);
module.exports = router;
