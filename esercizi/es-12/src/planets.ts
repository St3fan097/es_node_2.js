import { Request, Response } from "express";


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

const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets);
}
const getById = (req: Request, res: Response) => {
    const planetId = Number(req.params.id)
    const planet = planets.find((p) => p.id === planetId);
    res.status(200).json(planet);
}
const create = (req: Request, res: Response) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "Post completed" });
}
const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map(p => p.id === Number(id) ? ({ ...p, name }) : p)
    res.status(200).json({ msg: "Post updated" });
}
const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    planets = planets.filter(p => p.id !== Number(id));
    res.status(200).json({ msg: "Post deleted" });
}

export { getAll, getById, create, updateById, deleteById }