// /* globals module require */

// const DetailedMovie = require("./movie-details");

// module.exports = {
//     getMovieDetailed(imgUrl, title, description, genres, releaseDate, actors) {
//         return DetailedMovie.getDetailedMovie(imgUrl, title, description, genres, releaseDate, actors);
//     },
//     insertDetailedMovie(movies) {
//         movies.save((err, entry) => {
//             if (err) {
//                 console.log(`error ${err}`);
//             }
//             console.log(entry);
//         });
//     }
// };