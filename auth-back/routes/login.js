const { jsonResponse } = require("../lib/JasonResponse");
const getUserInfo = require("../lib/getUserInfo");
const User = require("../schema/user");
const router = require("express").Router();

router.post("/", async (req, res) => {
    const { nombre, contraseña } = req.body;

    if (!!!nombre || !!!contraseña) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are require",
            })
        );
    }
    const user = await User.findOne({ nombre })
    if (user) {
        const correctPassword = await user.comparePassword(contraseña, user.contraseña);

        if (correctPassword) {
            const accessToken = user.createAccessToken();
            const refreshToken = await user.createRefreshToken();
            res.status(200).json(
                jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
        } else {
            res.status(400).json(
                jsonResponse(400, {
                    error: "User or Password incorrect",
                })
            );
        }

    } else {
        res.status(400).json(
            jsonResponse(400, {
                error: "User not found",
            })
        );
    }
});

module.exports = router;