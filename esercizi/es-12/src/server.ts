import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { getAll, getById, create, updateById, deleteById, createImage } from "./planets.js";
import multer from "multer";

//mi riferisco al server express

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({storage});

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

app.post("/api/planets/:id/image", upload.single("image"), createImage)

//avvio server
app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});

