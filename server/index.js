require("dotenv").config();
const { verify } = require("./utils/auth.utility");
const mongoose = require("mongoose");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/types");
const resolvers = require("./schema/resolvers");
const path = require("path");

const { DB_PREFIX, DB_CONNECTION_STRING, DB_USER, DB_PASS } = process.env;

mongoose.connect(`${DB_PREFIX}${DB_USER}:${DB_PASS}${DB_CONNECTION_STRING}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", startApolloServer);

async function startApolloServer() {
  const app = express();
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
  await server.start();

  server.applyMiddleware({ app });

  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("/ping", function (req, res) {
    return res.send("pong");
  });

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
