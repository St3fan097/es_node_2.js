import express from "express";
import "express-async-errors";
import morgan from "morgan";



//mi riferisco al server express

const app = express();
const port = 3000;

//utilizzo un metodo morgan per fare la chiamata al server

app.use(morgan("dev"));

type Planet = {
    id: number,
    name: string,
};

type Planets = Planet[];

let planets: Planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
//metodo
app.get("/", (req, res) => {
    res.status(200).json(planets);
});

//avvio server
app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});