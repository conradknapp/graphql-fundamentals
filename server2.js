// Now we are pulling the different type objects from GraphQL, which we are using to define our schema. We make the schema out of the GraphQLObjectType, which has a name, description, and fields, and those fields correspond to the schema that we made in server0.js and server1.js, only that we are using the object types we get from graphql to define them now, and we are adding a description to them.

// At the end of the file, we pass this type object (which we defined as 'queryType') to the GraphQLSchema function, where we assign it to the value for 'query', we declare that result as 'schema', then we pass 'schema' into the graphqlHTTP middleware.

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

const PORT = process.env.PORT || 3000;

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
  description: "Query Videos",
  fields: {
    video: {
      type: videoType,
      resolve: () =>
        new Promise(resolve => {
          resolve({
            id: "a",
            title: "Hello World",
            duration: 213,
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

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
