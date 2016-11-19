/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const DetailedMovie = require("./detailed-movie-model");

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
    }
};