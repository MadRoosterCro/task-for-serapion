const {
  isAvailable,
  readData,
  getMovie,
  writeData,
} = require("../model/movieModel");

module.exports = {
  checkNaddMovie: async (req, res) => {
    const body = req.body;
    const words = body.name;
    const separateWord = words.toLowerCase().split(" ");
    for (let i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    body.name = separateWord.join(" ");
    if (!isAvailable(body.name)) {
      try {
        const apiMovies = await getMovie(body.name);
        if (apiMovies.hasOwnProperty(body.name)) {
          const currentDb = readData();
          currentDb[body.name] = apiMovies[body.name];
          const status = writeData(currentDb);
          if (status) {
            res.json({
              Succes: "The movie has been successfully added to the database",
            });
          } else {
            res.json({
              Succes: 0,
            });
          }
        } else {
          res.json({
            Status: "Movie is not in TV_Maze database",
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      res.json({
        Status: "Movie is available in local database",
      });
    }
  },

  showDetails: (req, res) => {
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
    let movieName = req.params.movieName;

    const words = movieName;
    const separateWord = words.toLowerCase().split(" ");
    for (let i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    movieName = separateWord.join(" ");

    const movieData = readData();
    if (isEmptyObject(movieData)) {
      res.json({
        Status: "Database is empty",
      });
    } else if (movieData.hasOwnProperty(movieName)) {
      res.json({ movieName, ...movieData[movieName] });
    } else {
      res.json({
        Status: "Movie is not in the database",
      });
    }
  },
};
