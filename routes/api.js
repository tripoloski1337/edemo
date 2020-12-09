var express = require("express");
var router  = express.Router();
var controller = require("../controller/api.js");

router.get("/",controller.Index);
router.get("/ruus",controller.list_ruus);
router.get("/ruus/:id",controller.detail_ruu);
router.post("/login", controller.Login);

module.exports = router;