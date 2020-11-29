const router = require("express").Router();
const managerController = require("../controllers/managerController");
router.post("/addClient", managerController.addClient);

module.exports = router;
