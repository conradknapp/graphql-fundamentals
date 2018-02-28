// Here is a very similar set-up to server0.js, however, we have pulled in express and express-graphql packages. Instead of using graphql function, we use the graphqlHTTP functions (from 'express-graphql') to wire everything up, and are using graphiql to view our queries now

const app = require("express")();
const graphqlHTTP = require("express-graphql");
const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`

  type Video {
    id: ID
    title: String
    duration: Int
    watched: Boolean
  }

  type Query {
    video: Video
    videos: [Video]
  }

  type Schema {
    query: Query
  }

`);

const videoA = {
  id: "1",
  title: "Bourne Identity",
  duration: 120,
  watched: false
};

const videoB = {
  id: "2",
  title: "Manchurian Candidate",
  duration: 140,
  watched: true
};

const videos = [videoA, videoB];

const resolvers = {
  video: () => ({
    id: "1",
    title: "Jason Bourne",
    duration: 200,
    watched: true
  }),
  videos: () => videos
};

const PORT = process.env.PORT || 3000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers
  })
);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
