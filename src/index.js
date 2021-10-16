const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");
const Database = require("better-sqlite3");
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//database

const db = new Database("./src/data/database.db", {
  verbose: console.log,
});
// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
//servidor estático películas
const staticServerPathMovies = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathMovies));
//servidor estático imágenes

server.get("/movies", (req, res) => {
  const genderFilterParam = req.query.gender;
  const query = db.prepare("SELECT * FROM movies order by name asc");

  const movies = query.all();
  /* const nameFilterParam = response.movies.sort((movies)=>movies.title === req.query.title);*/
  res.json(movies);
  res.json();
});

server.get("/movie/:movieId", (req, res) => {
  console.log("Url param movieId:", req.params.movieId);
});
