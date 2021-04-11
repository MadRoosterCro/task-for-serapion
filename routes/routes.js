const router = require("express").Router();

const {
  checkNaddMovie,
  showDetails,
} = require("../controller/movieController");

// Routes
/**
 * @swagger
 * /getMovieDetails/{movieName}:
 *  get:
 *    description: Use to get the details of a movie
 *    parameters:
 *       - in: path
 *         name: movieName
 *    responses:
 *        description: A successful response with movie details
 */
router.get("/getMovieDetails/:movieName", showDetails);

/**
 * @swagger
 * /checknadd:
 *  post:
 *    description: Find if the movie exists in local database. If not this will find the movie in http://api.tvmaze.com and add the movie to local database.
 *    consumes:
 *       - application/json
 *    parameters:
 *       - in: body
 *         name: movieName
 *         schema:
 *            type: object
 *            required:
 *              -name:
 *                type: string
 *    responses:
 *        description: If it returns {status:1} it is succesfully written to the database.
 */
router.post("/checknadd", checkNaddMovie);

module.exports = router;
