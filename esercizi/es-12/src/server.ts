import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { getAll, getById, create, updateById, deleteById } from "./planets.js"

//mi riferisco al server express

const app = express();
app.use(express.json());
const port = 3000;

//utilizzo un metodo morgan per fare la chiamata al server

app.use(morgan("dev"));


//metodo
app.get("/api/planets", getAll);

app.get("/api/planets/:id", getById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById)

//avvio server
app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});

