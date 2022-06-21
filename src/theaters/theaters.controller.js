const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res, next){
    const result = await theatersService.list();
    const reduceMovies = reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        rating: ["movies", null, "rating"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        created_at: ["movies", null, "created_at"],
        updated_at: ["movies", null, "updated_at"],
        is_showing: ["movies", null, "is_showing"],
        theater_id: ["movies", null, "theater_id"]
      });
    const data = reduceMovies(result);

    res.json({data});
}

module.exports = {
    list,
}