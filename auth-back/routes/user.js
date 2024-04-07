const { jsonResponse } = require("../lib/JasonResponse");
const router = require("express").Router();
router.get("/", (req, res) => {

    res.status(200).json(jsonResponse(200, req.user));
});

module.exports = router;