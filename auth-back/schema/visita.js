const { Schema, model } = require("mongoose");

// Definir el esquema para la visita
const VisitaSchema = new Schema({
    nombre: { type: String, required: true },
    unidad: { type: String, required: true },
    razon: { type: String, required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    vieneEnAuto: { type: Boolean, default: false }, // Nuevo campo para indicar si la visita viene en auto
    vehiculo: {
        placa: String,
        marca: String,
        modelo: String,
        color: String
    }
});


module.exports = model("Visita", VisitaSchema);