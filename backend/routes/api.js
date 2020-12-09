var express = require("express");
var router  = express.Router();
var controller = require("../controller/api.js");

router.get("/",controller.Index);
router.get("/ruus",controller.list_ruus);
router.get("/ruus/:id",controller.detail_ruu);
router.get("/countn/:id",controller.count_n_by_id);
router.get("/county/:id",controller.count_y_by_id);
router.post("/vote/:ruuid", controller.voting);

module.exports = router;