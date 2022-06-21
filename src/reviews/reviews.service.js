const knex = require("../db/connection");

function destroy(review_id){
    return knex("reviews").where({review_id}).del()
}

function read(review_id){
    return knex("reviews").select("*").where({review_id}).first();
}

function update(updatedReview){
    return knex("reviews").select("*").where({review_id: updatedReview.review_id}).update(updatedReview, "*")
}

function getCritic(review_id){
    return knex("reviews as r").join("critics as c", "r.critic_id", "c.critic_id").select("r.*", "c.*").where({"r.review_id": review_id})
}

module.exports = {
    delete: destroy,
    read,
    update,
    getCritic
}