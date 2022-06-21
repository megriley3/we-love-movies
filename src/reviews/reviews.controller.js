const { as } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service")
const mapProperties = require("../utils/map-properties");

async function reviewExists(req, res, next){
    const review = await reviewsService.read(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next();
    }
    next({status: 404, message: 'Review cannot be found.'})
}

async function destroy(req, res, next){
    await reviewsService.delete(res.locals.review.review_id);
    res.sendStatus(204);
}

async function update(req, res, next){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    };
    await reviewsService.update(updatedReview);
    const result = await reviewsService.getCritic(res.locals.review.review_id);
    const addCritic = mapProperties({
        preferred_name: ["critic", "preferred_name"],
        surname: ["critic", "surname"],
        organization_name: ["critic", "organization_name"],
    })
    const data = addCritic(result[0])
    res.json({data});
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), destroy],
    update: [asyncErrorBoundary(reviewExists), update]
}