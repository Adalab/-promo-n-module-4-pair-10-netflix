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

const staticServerPathMovies = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathMovies));


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
/*server.post("/movies/gender", (req, res) =>{
const genderFilterParam = response.movies.filter((movies)=>movies.gender === req.query.gender);
  const response ={
    success: true,
    movies,
    
  }
  console.log(req.query);
  
 
  res.json(response);
})*/
