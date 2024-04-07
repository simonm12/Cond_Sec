const { verifyAccessToken } = require("./verifyTokens");
const validateToken = require("./validateToken");

function authenticateToken(req, res, next) {
    let token = null;
    try {
        token = validateToken(req.headers);
    } catch (error) {
        log.error(error.message);
        if (error.message === "Token not provided") {
            return res.status(401).json({ error: "Token no proporcionado" });
        }
        if (error.message === "Token format invalid") {
            return res.status(401).json({ error: "Token mal formado" });
        }
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = { ...decoded.user };
        next();
    } catch (err) {
        console.log("6 Token inválido", token, err);
        return res.status(403).json({ error: "Token inválido" });
    }
}

module.exports = authenticateToken;