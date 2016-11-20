/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const DetailedMovie = require("./detailed-movie-model");
const Actor = require("./simple-actor-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    getAll() {
        return new Promise((resolve, reject) => {
            const query = SimpleMovie.find({}, "imdbId");

            resolve(query.exec());
        });
    },
    getDetailedMovie(imgUrl, title, description, genres, releaseDate, actors) {
        return DetailedMovie.getDetailedMovie(imgUrl, title, description, genres, releaseDate, actors);
    },
    insertDetailedMovie(movies) {
        movies.save((err, entry, number) => {
            if (err) {
                console.log(`error ${err}`);
            }
            console.log(entry);

        });
    },
    getActor(name, image, description, movies) {
        return new Actor({
            name,
            image,
            description,
            movies
        });
    },
    insertActor(actor) {
        actor.save();

        console.log(`It was inserted actor ${actor.name}`);
    }
};