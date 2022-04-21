const { Router } = require("express");
const videogame = require("./videogame");
const homeVideogames = require("./videogames");
const videogames = require("./videogames");
const videogameDetail = require("./videogames");
const genreRouter = require("./genres");
const createVideogame = require("./createVideogame");

const router = Router();

// Configuración de los routers
router.use("/home", homeVideogames);
router.use("/videogame", videogame);
router.use("/videogames", videogames);
router.use("/videogames", videogameDetail);
router.use("/genres", genreRouter);
router.use("/create", createVideogame);

module.exports = router;
