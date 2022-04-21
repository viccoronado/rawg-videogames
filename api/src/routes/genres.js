// Importar todos los routers
const fetch = require("node-fetch");
const { Router } = require("express");
const router = Router();
const { Genre } = require("../db.js");
const { APIKEY } = process.env;

//Obtiene todos los tipos de géneros de videojuegos posibles. En una primera instancia los trae desde rawg
//y los guarda en la base de datos para luego utilizarlos desde allí
router.get("/", function (req, res) {
  let gen = [];
  fetch(`https://api.rawg.io/api/genres?key=${APIKEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data &&
        data.results.forEach((b) => {
          Genre.findOrCreate({
            where: {
              name: b.name,
            },
          });
        });
    })
    .then(async () => {
      let generos = await Genre.findAll();
      res.json(generos);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
