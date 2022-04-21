# RAWG Video Games

_SPA desarrollada con React, Redux, NodeJS, Sequelize y PostgreSQL que consume datos de [RAWG Video Games API](https://rawg.io/)._

#### Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [ ] Videojuego con las siguientes propiedades:
  - ID
  - Nombre 
  - Descripción 
  - Fecha de lanzamiento
  - Rating
  - Plataformas 
- [ ] Género con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que un videojuego puede pertenecer a varios géneros en simultáneo y, a su vez, un género puede contener múltiples videojuegos distintos. 

#### Backend

Servidor desarrollado en Node/Express con las siguientes rutas:

- [ ] __GET /videogames__:
  - Obtiene un listado de los primeros 15 videojuegos
- [ ] __GET /videogames?name="..."__:
  - Obtiene un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego, devuelve un mensaje adecuado
- [ ] __GET /videogame/{idVideogame}__:
  - Obtiene el detalle de un videojuego en particular
  - Incluye los géneros asociados
- [ ] __GET /genres__:
  - Obtiene todos los tipos de géneros de videojuegos posibles
  - En una primera instancia los trae sólo desde RAWG para guardarlos en mi propia base de datos y luego utilizarlos desde allí
- [ ] __POST /videogame__:
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
