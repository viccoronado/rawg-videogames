const { Router } = require("express");
const { Op } = require("sequelize");
const { APIKEY } = process.env;
const SIZE = 15;
const fetch = require("node-fetch");
const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
const router = Router();

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
    let dataGame = games.results.map((game) => {
      let gameInformation = {
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((gen) => gen.name),
        platforms: game.platforms
          .map((p) => p.platform.name)
          .filter((p) => p != null)
          .join(", "),
        source: "API",
        id: game.id,
        rating: game.rating,
      };
      return gameInformation;
    });
    gamesResults = gamesResults.concat(dataGame);
  }
  let dbGames = await Videogame.findAll({ include: [Genre] });
  let jsonGames = dbGames.map((J) => J.toJSON());
  jsonGames.forEach((C) => {
    videogame.source = "Created";
  });
  gamesResults = gamesResults.concat(jsonGames);

  res.json(gamesResults);
});

//Obtiene un listado de los primeros 15 videojuegos y devuelve sólo los datos necesarios para la ruta principal

router.get("/", function (req, res) {
  fetch(`https://api.rawg.io/api/games?key=${APIKEY}&page_size=${SIZE}`)
    .then((response) => response.json())
    .then((data) => {
      const games = data.results;
      const videogames = games.map((videogame) => {
        const info = {
          name: videogame.name,
          image: videogame.background_image,
          genres: videogame.genres.map((genre) => genre.name),
          platforms: videogame.platforms
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
        let dataGame = data.results.map((game) => {
          let first15games = {
            name: game.name,
            image: game.background_image,
            genres: game.genres.map((gen) => gen.name),
            platforms: game.platforms
              .map((p) => p.platform.name)
              .filter((p) => p != null)
              .join(", "),
            source: "API",
            id: game.id,
            rating: game.rating,
          };
          return first15games;
        });
        res.json(dataGame.concat(gameDB));
      } catch (error) {
        console.error(error);
        res.send("ERROR: Videogame not found");
      }
    });
});

module.exports = router;
