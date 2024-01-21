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
app.get("/api/planets", (req, res) => {
    res.status(200).json(planets);
})
app.get("/api/planets/:id", (req, res) => {
    const planetId = Number(req.params.id)
    const planet = planets.find((p) => p.id === planetId);
    res.status(200).json(planet);
})
app.post("/api/planets", (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "Post completed" });
})
app.put("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map(p => p.id === Number(id) ? ({ ...p, name }) : p)
    res.status(200).json({ msg: "Post updated" });
})
app.delete("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    planets = planets.filter(p => p.id !== Number(id));
    res.status(200).json({ msg: "Post deleted" });
})

//avvio server
app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});