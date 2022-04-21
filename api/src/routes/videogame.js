// Importar todos los routers
const { Router } = require("express");
//const { APIKEY } = process.env;
const APIKEY = "9d5be115ecb6458db68b5cc2a529dc8d";
const router = Router();
const fetch = require("node-fetch");
const { Videogame, Genre } = require("../db.js");

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
        let C = data;
        const information = {
          name: C.name,
          image: C.background_image,
          genres: C.genres,
          description: C.description_raw,
          released: C.released,
          rating: C.rating,
          platforms:
            C.platforms &&
            C.platforms
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
