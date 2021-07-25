require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { verify } = require("./utils/auth.utility");
const mongoose = require("mongoose");

const { DB_PREFIX, DB_CONNECTION_STRING, DB_USER, DB_PASS } = process.env;

mongoose.connect(`${DB_PREFIX}${DB_USER}:${DB_PASS}${DB_CONNECTION_STRING}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  const typeDefs = require("./schema/types");
  const resolvers = require("./schema/resolvers");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      // Get the user token from the headers.
      let token = "";
      if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
      }

      // Try to retrieve a user with the token
      try {
        const user = await verify(token);
        if (user && user.email) {
          return { user };
        }
      } catch (e) {
        console.error(e);
      }
    },
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
