const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join();

const app = express();
app.use(express.json());

let database = null;

const initializeAndDbServer(){
    try {
        database = await open({
            filename: dataPath,
            driver: sqlite3.Database
        });
        app.listen(3000, () => {
            console.log("Server is running at: https://localhost:3000/")
        })
    }
    catch (e) {
        console.log(`DB Error:${e.message}`);
        console.log(exit(1));
    }
};
initializeAndDbServer();
const convertMovieIntoResponse=(obj)=>{
    return {
        movieId:dbObject.movie_id,
        directorId:dbObject.director_id,
        movieName : dbObject.movie_name,
        leadActor:dbObject.lead_actor,
    };
};
const convertDirectorIntoResponse=(obj)=>{
    return{
            directorId: dbObject.director_id,
            directorName: dbObject.director_name,
    };
};


//API 1 

app.get("/movies/", async (request, response) => {
    const getMovies = `SELECT movie_name FROM movie;`;
    const moviesArr = await database.all(getMoveis);
    response.send(moviesArr.map((EachMovie)=>({movieName:eachMovie.movie_name})));
});

//API 2
app.post("/movies/", async (request, response) => {
    const { directorId, movieName, leadActor } = request.body;
    const postMovie = `INSERT INTO 
    movie(director_id , movie_name , lead_actor)
        VALUES ("${directorId}",'${movieName}','${leadActor}')`;
    const movie = await = database.run(postMovie);
    response.send("Movie successfully added");
});

//API 3
app.get("/movies/:movieId/", async (request, response) => {
    const { movieId } = request.params;
    const getMovie = `SELECT * FROM movie where movie_id = '${movieId}';`;
    const movie = await database.get(getMovie);
    response.send(convertMovieIntoResponse(movie));
});

//API 4
app.put("/movies/:movieId/", async (request, response) => {
    const { directorId, movieName , leadActor } = response.body;
    const {movieId } = request.params;
     const updateMovieQuery = `
  UPDATE
    movie
  SET
    director_id = ${directorId},
    movie_name  = '${playerName}',
    lead_actor = '${leadActor}'
  WHERE
    movieId = ${movieId};`;

    await database.run(updateMovieQuery);
    response.send("Movie Details Updated")
});

//API 5

app.delete("/movies/:movieId/", async (request,response)=>{
    const { movieId } = request.params;
    const deleteMovie =`
    DELETE from movie where movie_id = ${movieId}`;
    await database.run(deleteMovie);
    response.send("Movie Removed");
})

//API 6

app.get("/directors/",(request,response)=>{
    const directors=`SELECT * FROM director`;
    const directorArr = await database.all(directors);
    response.send(directorArr.map((eachDirector)=>({ convertDirectorIntoResponse(eachDirector)})));
});

//API 7
app.get("/directors/:directorId/movies/",(request,response)=>{
    const {directorId} = request.params;
     const directorQuery = `SELECT movie_name FROM movie where director_id = ${directorId};`;
     const movieArray = database.all(directorQuery);
     response.send(movieArray.map((eachDirector)=>({movieName:eachMovie.movie_name})));
});
module.exports = app;