const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authenticate = require("./Auth/authenticate");
require("dotenv").config();

const port = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());

async function main() {
    await mongoose.connect(process.env.DB_CONECTION_STRING);
    console.log("Conected to MongoDB");
}

main().catch(console.error);

app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/refresh-token", require("./routes/refreshTokens"));
app.use("/api/user", authenticate, require("./routes/user"));
app.use("/api/formulario-visitas", require("./routes/FormularioVisitas"));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
