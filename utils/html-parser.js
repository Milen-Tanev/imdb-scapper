/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window);

module.exports.parseSimpleMovie = (selector, html) => {
    $("body").html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            title: $item.html(),
            url: $item.attr("href")
        });
    });

    return Promise.resolve()
        .then(() => {
            return items;
        });
};


module.exports.parseDetailedMovie = (info) => {
    $("body").html(info.body);

    let imgSrc = $(".poster a img").first().attr("src");
    let summaryText = $(".summary_text").first().text().trim();
    const genres = [];
    let $genreee = $(".see-more.inline.canwrap[itemprop = genre] a");

    $genreee.each((index, item) => {
        const $item = $(item);

        genres.push($item.text());
    });

    let releaseDate = $(".subtext a[title]").text();
    let firstBracketIndex = releaseDate.indexOf("(");
    releaseDate = releaseDate.substring(0, firstBracketIndex);
    let title = $(".title_block .title_wrapper h1")
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

    const actors = [];
    let $actorSelector = $(".article .cast_list tr[class]");

    $actorSelector.each((index, item) => {
        let $item = $(item);
        let img = $item.find(".primary_photo a img").attr("src");

        let character = $item.find(".character div").text().trim();
        let imdbId = $item.find(".itemprop a").attr("href");
        let name = $item.find(".itemprop a span").text().trim();

        actors.push({
            name,
            img,
            character,
            imdbId
        });
    });

    return {
        imgSrc,
        summaryText,
        title,
        genres,
        releaseDate,
        actors
    };
};

module.exports.parseActor = (selectors, html) => {
    $("body").html(html);

    const profileImage = selectors.profileImage;
    const name = selectors.name;
    const biography = selectors.biography;
    const moviesName = selectors.moviesName;
    const moviesImdbId = selectors.moviesImdbId;
    const moviesCharacterName = selectors.moviesCharacterName;

    const movies = [];

    const moviesNames = $(moviesName);
    const moviesIds = $(moviesImdbId);
    const moviesCharacters = $(moviesCharacterName);

    for (let i = 0; i < $(moviesName).length; i += 1) {
        let character = moviesCharacters.eq(i).text().split("\n");

        if (character[character.length - 2] == "") {
            character = character[character.length - 3];
        } else {
            if (character[character.length - 2].indexOf("(") == 0) {
                character = character[character.length - 3];
            } else {
                character = character[character.length - 2];
            }
        }

        let movie = {
            name: moviesNames.eq(i).html(),
            imdbId: moviesIds.eq(i).attr("href"),
            characterName: character
        };

        movies.push(movie);
    }

    let actorName = $(name).text();
    let image = $(profileImage).attr("src");
    let description = $(biography).text().split("   ")[0];

    let actor = {
        actorName,
        image,
        description,
        movies
    };

    return Promise.resolve()
        .then(() => {
            return actor;
        });
};