// When we tried to use arguments in server3.js, it wasn't fully functional. We need to not only create this args field on our queryType, but it needs a function to yield a result. So we created a file (data.js) and then created the getVideoById function. We export that from the data.js file, we import it and pass it into our resolve function.

// We also created a mutationType on top of a queryType. We follow almost the same process as when we made the queryType--it has a name, description, fields (which hold the mutations we want to execute), and then corresponding resolve functions for those mutations. We create a mutation function in our data.js file. We export it from there and then import it into server4.js, we place that function as the resolve function of the given mutation on the fields object.

// Then, finally, we pass that into our GraphQLSchema function (just like we did with queryType), and assign it to 'mutation'. And now we can make mutations in GraphQL, just like we can make queries.

const app = require("express")();
const graphqlHTTP = require("express-graphql");
const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require("graphql");

const { getVideoById, getVideos, createVideo } = require("./data.js");

const PORT = process.env.PORT || 3000;
const videoType = new GraphQLObjectType({
  name: "Video",
  description: "A collection of videos",
  fields: {
    id: {
      type: GraphQLID,
      description: "id of the video"
    },
    title: {
      type: GraphQLString,
      description: "title of the video"
    },
    duration: {
      type: GraphQLInt,
      description: "duration of the video"
    },
    watched: {
      type: GraphQLBoolean,
      description: "whether the video has been watched"
    }
  }
});

const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Query of videos",
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The id of the video"
        }
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      }
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation type",
  fields: {
    createVideo: {
      type: videoType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: "the title of video"
        },
        duration: {
          type: new GraphQLNonNull(GraphQLInt),
          description: "time of video"
        },
        released: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: "when its been released"
        }
      },
      resolve: (_, args) => {
        return createVideo(args);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
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
