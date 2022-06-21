const moviesService = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties.js");

async function list(req, res, next){
    const showingOnly = req.query.is_showing;
    if(showingOnly){
        let data = await moviesService.current();
        data = data.filter((movie, index) => {
            if(index != 0){
                const prevIndex = index-1;
                return movie.movie_id != data[prevIndex].movie_id;
            } 
            return movie = movie;
            
        });
        res.json({data})
    } else{
        const data = await moviesService.list();
        res.json({data})
    }
}

async function movieExists(req, res, next){
    const movie = await moviesService.read(req.params.movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    next({status: 404, message: `Movie cannot be found.`})

}

async function read(req, res, next){
    const {movie: data} = res.locals;
    res.json({data})
}

async function listTheaters(req, res, next){
    const {movie_id} = res.locals.movie;
    const data = await moviesService.listTheaters(movie_id);
    res.json({data})
}

async function listReviews(req, res, next){
    const {movie_id} = res.locals.movie;
    const results = await moviesService.listReviews(movie_id);
    const addCritic = mapProperties({
        critic_id: ["critic",  "critic_id"],
        preferred_name: ["critic", "preferred_name"],
        surname: ["critic", "surname"],
        organization_name: ["critic", "organization_name"],
    })
    const data = results.map((result) => addCritic(result))
    res.json({data})
}


module.exports = {
    list,
    read: [asyncErrorBoundary(movieExists), read],
    listTheaters: [asyncErrorBoundary(movieExists), listTheaters],
    listReviews: [asyncErrorBoundary(movieExists), listReviews]
}