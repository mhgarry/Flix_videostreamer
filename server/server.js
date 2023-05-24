require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const cors = require("cors");
const PORT = process.env.PORT || 3333;
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(cors());


const connectToDatabase = require("./config/connection");

connectToDatabase(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/flix_video_db");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  })
);

// Added a route to serve the React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`GraphQL server waiting at /graphql`);
});
