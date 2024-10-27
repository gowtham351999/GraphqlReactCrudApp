require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Using an environment variable for the URI
const uri = process.env.MONGODB_URI;

app.use(cors());

mongoose
  .connect(uri)
  .then(() => console.log("DB connection successful!"))
  .catch(err => console.error("DB connection error:", err)); // Adding error handling

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

module.exports = app;

const port = process.env.PORT || 4000; // Default to port 4000
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
