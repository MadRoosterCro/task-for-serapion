# nodejs-tech-skill-task
Task for serapion

Install Node modules

```bash
npm install
```

Then run the server.

```bash
npm start
```

### Swagger doc Endpoint

```bash
http://localhost:3000/api-docs
```

I've created two endpoints, in the first endpoint you can enter the movie/show name and check if a movie is in the local db, if it is, it will show you movie details.

The other endpoint is used for searching for a movie/show and adding non existing movies to the database.

After opening swagger, you can click on `GET` to check the local db for a certain movie/show.
Click on `Try it out!` button and in the input field enter the name of the movie/show you are interested in.


If the movie/show is not in the db, you can use `POST` to add it via the external API. 

Do the same as in the first method and in the input you can pass the movie name as a json and it will be added to our db. (ex. `{"name":"superman"}`)