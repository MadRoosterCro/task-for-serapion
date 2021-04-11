const { rejects } = require("assert");
const axios = require("axios");
const fs = require("fs");
const { resolve } = require("path");

module.exports = {
  //This method will fetch data from https://www.tvmaze.com/api and return the name and few details about the movie we entered
  getMovie: async (name) => {
    const tv_maze = `http://api.tvmaze.com/search/shows?q=${name}`;
    let result = {};

    const response = await axios.get(tv_maze);
    for (let i = 0; i < response.data.length; i++) {
      const { url, type, language } = response.data[i].show;
      const score = response.data[i].score;
      result[response.data[i].show.name] = { url, type, language, score };
    }
    return result;
  },

  //Check the movie in local database
  isAvailable: (movieName) => {
    try {
      const result = fs.readFileSync("./movies.json", "utf-8");
      const jsonResult = JSON.parse(result);
      if (jsonResult.hasOwnProperty(movieName)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  },

  //Get all data from local database
  readData: () => {
    try {
      const result = fs.readFileSync("./movies.json", "utf-8");
      const jsonResult = JSON.parse(result);
      return jsonResult;
    } catch (err) {
      console.log(err);
    }
  },

  //write data to local database
  writeData: async (dbData) => {
    try {
      await fs.writeFile("./movies.json", JSON.stringify(dbData), (err) => {
        if (err) {
          return false;
        } else {
          return true;
        }
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
