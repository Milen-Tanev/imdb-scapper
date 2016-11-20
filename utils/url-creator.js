"use strict"

var _ = require("lodash");

module.exports = function(genre, i){
    let index = i+1;
    var compiled = _.template('http://www.imdb.com/search/title?genres=<%= genre %>&title_type=feature&0sort=moviemeter,asc&page=<%= index %>&view=simple&ref_=adv_nxt');
    var url = compiled({ 'genre': genre, 'index': (index)});
    return url;
};