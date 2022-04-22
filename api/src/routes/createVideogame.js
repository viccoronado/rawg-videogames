// Importar todos los routers
const { Router } = require("express");
const { Videogame, Genre } = require("../db.js");
const router = Router();

//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body.
//Crea un videojuego en la base de datos

router.post("/", async (req, res) => {
  const { name, description, released, rating, platforms, genres } = req.body;
  console.log(req.body);

  let gameCreated = await Videogame.create({
    name,
    description,
    released,
    rating,
    platforms,
  });

  genres.forEach(async (G) => {
    let genresGame = await Genre.findOne({ where: { name: G } });
    gameCreated.addGenre(genresGame);
  });
  res.send("Videogame created succesfully!");
});

module.exports = router;
