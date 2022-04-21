// Importar todos los routers
const { Router } = require("express");
const { Op } = require("sequelize");
const { APIKEY } = process.env;
const router = Router();
const fetch = require("node-fetch");
const { Videogame, Genre } = require("../db.js");
const axios = require("axios");

//Obtiene un listado de los primeros cien videojuegos para mostrarlos en la ruta principal desde el FE
async function getGames(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

router.get("/", async function getAllGames(req, res) {
  let gamesResults = [];
  let apiRAWG = `https://api.rawg.io/api/games?key=${APIKEY}`;
  for (let index = 0; index < 5; index++) {
    let games = (await axios.get(apiRAWG)).data;
    apiRAWG = games.next;
    let dataGame = games.results.map((G) => {
      var game = {
        name: G.name,
        image: G.background_image,
        genres: G.genres.map((gen) => gen.name),
        platforms: G.platforms
          .map((p) => p.platform.name)
          .filter((p) => p != null)
          .join(", "),
        source: "Api",
        id: G.id,
        rating: G.rating,
      };
      return game;
    });
    gamesResults = gamesResults.concat(dataGame);
  }
  let dbGames = await Videogame.findAll({ include: [Genre] });
  let jsonGames = dbGames.map((J) => J.toJSON());
  jsonGames.forEach((C) => {
    C.source = "Created";
  });
  gamesResults = gamesResults.concat(jsonGames);

  res.json(gamesResults);
});

//Obtiene un listado de los primeros 15 videojuegos y devuelve sólo los datos necesarios para la ruta principal

router.get("/", function (req, res) {
  fetch(`https://api.rawg.io/api/games?key=${APIKEY}&page_size=15`)
    .then((response) => response.json())
    .then((data) => {
      const games = data.results;
      const videogames = games.map((V) => {
        const info = {
          name: V.name,
          image: V.background_image,
          genres: V.genres.map((genre) => genre.name),
          platforms: C.platforms
            .map((p) => p.platform.name)
            .filter((p) => p != null)
            .join(", "),
        };
        return info;
      });
      res.json(videogames);
    });
});

//Obtiene un listado de los primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//Si no existe ningún videojuego muestra un mensaje adecuado

router.get("/:name", function (req, res) {
  const name = req.params.name;

  fetch(
    `https://api.rawg.io/api/games?search=${name}&key=${APIKEY}&page_size=15`
  )
    .then((response) => response.json())
    .then(async (data) => {
      try {
        let gameDB = await Videogame.findAll({
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
            // ,include: [Genre]
          },
        });
        let dataGame = data.results.map((G) => {
          var game = {
            name: G.name,
            image: G.background_image,
            genres: G.genres.map((gen) => gen.name),
            platforms: G.platforms
              .map((p) => p.platform.name)
              .filter((p) => p != null)
              .join(", "),
            source: "Api",
            id: G.id,
            rating: G.rating,
          };
          return game;
        });
        res.json(dataGame.concat(gameDB));
      } catch (error) {
        console.error(error);
        res.send("ERROR: Videogame not found");
      }
    });
});

module.exports = router;
