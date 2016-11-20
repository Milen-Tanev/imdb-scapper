module.exports = {
    connectionString: "mongodb://localhost/moviesDb",
    genres: ["action", "sci-fi", "fantasy", "horror", "comedy"],
    pagesCount: 50,
    actorSelector: {
        profileImage: "#name-poster",
        name: "#overview-top .header span",
        biography: "#name-bio-text .inline",
        moviesName: "#filmography .filmo-category-section:first .filmo-row b a",
        moviesImdbId: "#filmography .filmo-category-section:first .filmo-row b a",
        moviesCharacterName: "#filmography .filmo-category-section:first .filmo-row"
    }
};