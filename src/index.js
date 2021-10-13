const express = require('express');
const cors = require('cors');
const movies= require('./data/movies.json');
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
//servidor estático películas
const staticServerPathMovies = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathMovies));
//servidor estático imágenes

server.get("/movies", (req, res) =>{

  const response ={
    success: true,
    movies,
    
  }
  console.log(req.query);
  const genderFilterParam = response.movies.filter((movies)=>movies.gender === req.query.gender);
 /* const nameFilterParam = response.movies.sort((movies)=>movies.title === req.query.title);*/
  res.json(response);
  res.json()
})

