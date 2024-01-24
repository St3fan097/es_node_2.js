import { Request, Response } from "express";
import Joi from "joi";
import { db } from "./db.js";


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

const getAll = async (req: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets;`);
    console.log(planets);
    res.status(200).json(planets);
}
const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`,Number(id));
    console.log(planet);
    res.status(200).json(planet);
}

const planetSchema = Joi.object({
    name: Joi.string().required(),
});

const create = async (req: Request, res: Response) => {
    const { name } = req.body;
    const newPlanet = { name };
const valNewPlanet = planetSchema.validate(newPlanet);

if(valNewPlanet.error){
    return res
    .status(400)
    .json({msg: valNewPlanet.error.details[0].message });
} else {
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    res.status(201).json({ msg: "Post completed" });
}
};

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
    res.status(200).json({ msg: "Post updated" });
}
const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await db.none(`DELETE FROM planets id=$1`, Number(id))
    res.status(200).json({ msg: "Post deleted" });
}

const createImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fileName = req.file?.path;
    if (fileName){
      await db.none(`UPDATE planets SET image:$2 WHERE id=$1`, [id, fileName]);
        res.status(201).json({msg: "Image updated"});
    } else {
        res.status(400).json({msg: "Image not updated"})
    }
};

console.log(planets);

export { getAll, getById, create, updateById, deleteById, createImage }