# RAWG Video Games 🎮

_SPA desarrollada con React, Redux, NodeJS, Sequelize y PostgreSQL que consume datos de [RAWG Video Games API](https://rawg.io/)._

#### Base de datos 🔑

_El modelo de la base de datos tiene las siguientes entidades:_

- [x] __Videojuego con las siguientes propiedades:__
  - ID
  - Nombre 
  - Descripción 
  - Fecha de lanzamiento
  - Rating
  - Plataformas 
- [x] __Género con las siguientes propiedades:__
  - ID
  - Nombre

_La relación entre ambas entidades es de muchos a muchos ya que un videojuego puede pertenecer a varios géneros en simultáneo y, a su vez, un género puede contener múltiples videojuegos distintos._

#### Backend ⚙

_Servidor desarrollado en Node/Express con las siguientes rutas:_

- [x] __GET /videogames__:
  - Obtiene un listado de los primeros 15 videojuegos
- [x] __GET /videogames?name="..."__:
  - Obtiene un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego, devuelve un mensaje adecuado
- [x] __GET /videogame/{idVideogame}__:
  - Obtiene el detalle de un videojuego en particular
  - Incluye los géneros asociados
- [x] __GET /genres__:
  - Obtiene todos los tipos de géneros de videojuegos posibles
  - En una primera instancia los trae sólo desde RAWG para guardarlos en mi propia base de datos y luego utilizarlos desde allí
- [x] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos

## Construido con 🛠️

* [JavaScript](https://www.javascript.com/)    
* [Express](https://expressjs.com/) 
* [NodeJs](https://nodejs.org/es/) 
* [Sequelize](https://sequelize.org/)
* [PostgreSQL](https://www.postgresql.org/)


---
⌨️ con ❤️ por [Victoria Coronado](https://github.com/viccoronado) 😊
