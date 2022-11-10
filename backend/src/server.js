const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { readFileSync } = require('fs');
const { resolvers } = require('./graphql/resolvers/index');
const User = require('./models/userModel');
const PoliceStation = require('./models/policeStationModel');
const Complaint = require('./models/complaintModel');
const { getUserFromToken } = require('./utils/getUserFromToken');
const connectToDatabase = require('./utils/db');
require('dotenv').config();
const cors= require('cors')
const app = express();


app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);


async function initiateGraphQl() {
  const typeDefs = readFileSync(
    path.join(__dirname, './graphql/schema.graphql'),
    'utf8'
  );

  const context = async ({ req, res }) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const userInfo = await getUserFromToken(token);
    return {
      models: { User, PoliceStation, Complaint },
      userInfo,
    };
  };

  const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    formatError: (error) => {
      return error;
    },
    context,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

initiateGraphQl();
connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log('app is listening to port 5000');
  console.log(`GraphQL endpoint: http://localhost:${process.env.PORT}/graphql`);
});
