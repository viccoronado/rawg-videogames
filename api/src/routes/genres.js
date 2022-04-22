// Importar todos los routers
const fetch = require("node-fetch");
const { Router } = require("express");
const { Genre } = require("../db.js");
const { APIKEY } = process.env;
const { URL } = process.env;
const router = Router();

//Obtiene todos los tipos de géneros de videojuegos posibles. En una primera instancia los trae desde rawg
//y los guarda en la base de datos para luego utilizarlos desde allí
router.get("/", function (req, res) {
  let genresOfGames = [];
  fetch(`${process.env.URL}${process.env.APIKEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data &&
        data.results.forEach((genre) => {
          Genre.findOrCreate({
            where: {
              name: genre.name,
            },
          });
        });
    })
    .then(async () => {
      let genres = await Genre.findAll();
      res.json(genres);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
