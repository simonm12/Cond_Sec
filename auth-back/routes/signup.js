const { jsonResponse } = require("../lib/JasonResponse");
const User = require("../schema/user");
const router = require("express").Router();
router.post("/", async (req, res) => {
    const { nombre, rut, email, telefono, contraseña } = req.body;

    if (!!!nombre || !!!rut || !!!email || !!!telefono || !!!contraseña) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are require",
            })
        );
    }

    try {
        const user = new User();
        const exists = await user.rutExist(rut)

        if (exists) {
            return res.status(400).json(
                jsonResponse(400, {
                    error: "User Already Exist",
                })
            );
        } else {
            const newUser = new User({ nombre, rut, email, telefono, contraseña });
            await newUser.save();

            res.status(200).json(
                jsonResponse(200, {
                    message: "User created successfuly",
                })

            );

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            jsonResponse(500, {
                error: "Error creating User",
            })
        );

    }

});

module.exports = router;