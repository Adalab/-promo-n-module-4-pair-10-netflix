const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
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
const staticServerPathImage = './src/public-movies-images';
server.use(express.static(staticServerPathImage));


// VIEW EJS motor de plantillas

server.set('view engine', 'ejs');

//database

const db =new Database("./src/db/users.db", {
  verbose: console.log,
});

//llenar la bs movies


//endpoints
server.get("/movies", (req, res) => {
  const query = db.prepare("SELECT * FROM movies order by title asc");
  const moviesFound = query.all();
  res.json( {movies: moviesFound});
  
});

server.post('/login-user', (req, res) => {
  const email=req.body.userEmail;
  const password=req.body.userPassword;
 console.log(req.body)

  if(email === undefined || password== undefined){
    //res.sendStatus(404);
    res.json({success: false, errorMessage: "No existen los valores"});
  }
  else{
     const query = db.prepare('SELECT * FROM users WHERE email = ? and password = ? ');
  const userAll = query.get(email, password);
  if(userAll !== undefined){
    res.json({success: true, userId: userAll.id});
  }else{
    res.json({success: false, errorMessage: "Usuario no encontrado "});
  }
  }
  
});

{/*server.post("/sign-up", (req, res) => {
  let response = req.body;
  console.log(req.body);
   if(req.body.userEmail ===''||req.body.userPassword ===''){
    res.json({success: false, errorMessage: "Debes rellenar los campos"});
   }else{
     const query = db.prepare('INSERT INTO users (email,password) VALUES (?,?)')
     const result = query.run(req.body.userEmail,req.body.userPassword);
      response = { 
       success: true, 
       userId: result.lastInsertRowId}
   }
   res.json(response);
 });*/}

 
 server.post('/signup', (req, res) => {
  const email=req.body.userEmail;
  const password=req.body.userPassword;

  if ( email === "" ||  password === "") {
    //si los datos no son correctos devuelvo un error
    res.json({ success: false, errorMessage: "Rellena todos los campos" });
  } else{
  const querySignUp = db.prepare('SELECT * FROM main.users WHERE email=? and password=?')
  const userFound= querySignUp.get(email, password);
    if (userFound === undefined){
    const query = db.prepare('INSERT INTO users(email, password) values (?,?)')
      
    const userNew= query.run(req.body.email, req.body.password);
    res.json({success: true, userId: userNew.lastInsertRowid});
   
    } else{
      res.json({success: false, errorMessage: "Usuario ya registrado "});
  }
  
}  
      
    

});