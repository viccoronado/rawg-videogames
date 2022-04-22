const { Router } = require("express");
const videogame = require("./videogameDetail");
const homeVideogames = require("./videogamesToShow");
const videogames = require("./videogamesToShow");
const videogameDetail = require("./videogamesToShow");
const genreRouter = require("./genres");
const createVideogame = require("./createVideogame");

const router = Router();

// Configuración de los routers
router.use("/home", homeVideogames);
router.use("/videogameDetail", videogame);
router.use("/videogamesToShow", videogames);
router.use("/videogamesToShow", videogameDetail);
router.use("/genres", genreRouter);
router.use("/create", createVideogame);

module.exports = router;
