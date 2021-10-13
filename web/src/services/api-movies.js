// login

const getMoviesFromApi = (movies) => {
  console.log('Se están pidiendo las películas de la app');
  console.log(getMoviesFromApi);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`http://localhost:4000/movies?gender=${movies.gender}&name=${movies.title}`,{method:"GET"})
    .then(response => response.json())
    .then((data) => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return data;
       
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
