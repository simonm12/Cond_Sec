const express = require("express");
const router = express.Router();
const Token = require("../schema/token");
const validateToken = require("../Auth/validateToken");
const { jsonResponse } = require("../lib/JasonResponse");

router.delete("/", async function (req, res, next) {
    try {
        const refreshToken = validateToken(req.headers);

        if (refreshToken) {
            await Token.findOneAndDelete({ token: refreshToken });
            res.status(200).json(jsonResponse(200, {
                message: "Token removed"
            }
            ));
        }
    } catch (err) {
        return next(new Error("Error loging out the user " + err.message));
    }
});

module.exports = router;