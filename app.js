/* globals console require setTimeout Promise */
"use strict";

const httpRequester = require("./utils/http-requester");
const htmlParser = require("./utils/html-parser");
const queuesFactory = require("./data-structures/queue");
const modelsFactory = require("./models");
const constants = require("./config/constants");
/* the only new line is this one + deleted function wait */
const wait = require("./utils/wait");

require("./config/mongoose")(constants.connectionString);

let urlsQueue = queuesFactory.getQueue();

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = `http://www.imdb.com/search/title?genres=${genre}&title_type=feature&0sort=moviemeter,asc&page=${i+1}&view=simple&ref_=adv_nxt`;
        urlsQueue.push(url);
    }
});

function getMoviesFromUrl(url) {
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const selector = ".col-title span[title] a";
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then(movies => {
            let dbMovies = movies.map(movie => {
                return modelsFactory.getSimpleMovie(movie.title, movie.url);
            });

            modelsFactory.insertManySimpleMovies(dbMovies);

            return wait(1500);
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getMoviesFromUrl(urlsQueue.pop());
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

const asyncPagesCount = 15;

Array.from({ length: asyncPagesCount })
    .forEach(() => getMoviesFromUrl(urlsQueue.pop()));


function getDetailedMovieFromUrl(url) {
    httpRequester.get(url)
        .then((result) => {
            return htmlParser.parseDetailedMovie({ body: result.body });
        })
        .then((info) => {
            let movieToAdd = modelsFactory.getDetailedMovie(
                info.imgSrc,
                info.title,
                info.summaryText,
                info.genres,
                info.releaseDate,
                info.actors);

            modelsFactory.insertDetailedMovie(movieToAdd);
        });
}

modelsFactory.getAll()
    .then((res) => {

        for (let i = 0; i < res.length; i += 1) {

            const currentUrl = `http://www.imdb.com/title/${res[i].imdbId}`;

            getDetailedMovieFromUrl(currentUrl);
        }
    });