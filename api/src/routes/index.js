const { Router } = require("express");
const videogame = require("./getVideogameDetail");
const homeVideogames = require("./getVideogamesToShow");
const videogames = require("./getVideogamesToShow");
const videogameDetail = require("./getVideogamesToShow");
const genreRouter = require("./getGenres");
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
