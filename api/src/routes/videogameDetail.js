const { Router } = require("express");
const { APIKEY } = process.env;
const fetch = require("node-fetch");
const { Videogame, Genre } = require("../db.js");
const router = Router();

//Obtiene el detalle de un videojuego en particular, trae sólo los datos pedidos en la ruta de
//detalle de videojuego e incluye los géneros asociados

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const dbGame = await Videogame.findOne({
    where: { id: id },
    include: [Genre],
  });
  if (dbGame === null) {
    fetch(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`)
      .then((response) => response.json())
      .then((data) => {
        let videogame = data;
        const information = {
          name: videogame.name,
          image: videogame.background_image,
          genres: videogame.genres,
          description: videogame.description_raw,
          released: videogame.released,
          rating: videogame.rating,
          platforms:
          videogame.platforms &&
          videogame.platforms
              .map((p) => p.platform.name)
              .filter((p) => p != null)
              .join(", "),
        };
        res.json(information);
      });
  } else {
    res.json(dbGame);
  }
});

module.exports = router;
