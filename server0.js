// Base set-up of GraphQL; can query either single video or videos (just from a static array), has resolvers that give us a result for our queries, we hook the query, schema, resolvers together using the graphql function and it returns a promise that we can then on and can see the result in the console.

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

const query = `

query initialQuery {
  videos {
    id,
    title,
    duration,
    watched
  }
}
`;

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(err => console.error(err));
