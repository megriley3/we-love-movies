const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(){
    return knex("movies").select("*")
}

function current(){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*").where({"mt.is_showing": true})
        
}

async function read(movie_id){
    return knex("movies").select("*").where({"movie_id": movie_id}).first()
}

async function listTheaters(movie_id){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*").where({"mt.movie_id": movie_id})
}

async function listReviews(movie_id){
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*").where({"r.movie_id": movie_id});
}

module.exports = {
    list,
    current,
    read,
    listTheaters,
    listReviews,
}