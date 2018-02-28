// Here we are starting to use arguments to be able to query a certain video based on its id. To do this, we add a new field to the video field on our queryType, "args". This takes the arguments that we want to pass into it ("id" in this case) and we pass in its type (GraphQLID) and a description

const app = require("express")();
const graphqlHTTP = require("express-graphql");
const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType
} = require("graphql");

const videoType = new GraphQLObjectType({
  name: "Video",
  description: "A collection of videos",
  fields: {
    id: {
      type: GraphQLID,
      description: "id of video"
    },
    title: {
      type: GraphQLString,
      description: "title of video"
    },
    duration: {
      type: GraphQLInt,
      description: "duration of video"
    },
    watched: {
      type: GraphQLBoolean,
      description: "whether video has been watched"
    }
  }
});

const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Query of videos",
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description: "The id of the video"
        }
      },
      resolve: () =>
        new Promise(resolve => {
          resolve({
            id: "1",
            title: "Hi",
            duration: 150,
            watched: false
          });
        })
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
