const { generateAccessToken } = require("../Auth/generateTokens");
const { verifyRefreshToken } = require("../Auth/verifyTokens");
const { jsonResponse } = require("../lib/JasonResponse");
const Token = require("../schema/token")
const router = require("express").Router();
const getUserInfo = require("../lib/getUserInfo");


router.post("/", async function (req, res, next) {
    //log.info("POST /api/refresh-token");
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        console.log("No se proporcionó token de actualización", refreshToken);
        return res
            .status(401)
            .json({ error: "Token de actualización no proporcionado" });
    }

    try {
        const tokenDocument = await Token.findOne({ token: refreshToken });

        if (!tokenDocument) {
            return res.status(403).json({ error: "Token de actualización inválido" });
        }

        const payload = verifyRefreshToken(tokenDocument.token);
        const accessToken = generateAccessToken(getUserInfo(payload.user));
        res.json(jsonResponse(200, { accessToken }));
    } catch (error) {
        return res.status(403).json({ error: "Token de actualización inválido" });
    }
});

module.exports = router;