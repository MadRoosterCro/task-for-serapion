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
 *    description: Use this to get the details of a movie. Click on try it out and write a movie name in the input field.
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
 *    description: Find if the movie exists in local database using the first method. If it doesn't exist, this will find the movie in http://api.tvmaze.com and add it to the local db.
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
