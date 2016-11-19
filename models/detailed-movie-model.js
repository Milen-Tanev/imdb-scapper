/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let ActorSchema = new Schema({
    character: String,
    name: String,
    id: String,
    img: String
});

mongoose.model("actor", ActorSchema);

let MovieDetailsSchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    actors: [ActorSchema]
});

let MovieDetails;

MovieDetailsSchema.statics.getDetailedMovie =
    function(imgUrl, title, description, genres, releaseDate, actors) {

        return new MovieDetails({ imgUrl, title, description, genres, releaseDate, actors });
    };


mongoose.model("MovieDetails", MovieDetailsSchema);

MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;