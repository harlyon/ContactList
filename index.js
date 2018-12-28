const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./server/schema/schema');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://harry:harry24680@ds033400.mlab.com:33400/newdb', { useNewUrlParser: true } )
mongoose.connection.once('open', () => {
  console.log('Database connected');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(5000, () => {
  console.log('App listening on port 5000!');
});