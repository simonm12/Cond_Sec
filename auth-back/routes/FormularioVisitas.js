const { jsonResponse } = require("../lib/JasonResponse");
const Visita = require("../schema/visita");
const router = require("express").Router();

router.post("/", async (req, res) => {
    const { nombre, unidad, razon, fecha, hora, vieneEnAuto, vehiculo } = req.body;

    if (!nombre || !unidad || !razon || !fecha || !hora) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Todos los campos son requeridos",
            })
        );
    }

    try {
        let nuevaVisitaData = { nombre, unidad, razon, fecha, hora };

        // Si la visita viene en auto, agregar los datos del vehículo a la información de la visita
        if (vieneEnAuto) {
            nuevaVisitaData.vieneEnAuto = true;
            nuevaVisitaData.vehiculo = vehiculo;
        }

        const nuevaVisita = new Visita(nuevaVisitaData);
        await nuevaVisita.save();

        res.status(200).json(
            jsonResponse(200, {
                message: "Visita registrada exitosamente",
            })
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            jsonResponse(500, {
                error: "Error al registrar la visita",
            })
        );
    }
});

module.exports = router;