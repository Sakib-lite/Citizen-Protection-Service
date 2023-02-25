const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { readFileSync } = require('fs');
const { resolvers } = require('./src/graphql/resolvers/index');
const User = require('./src/models/userModel');
const PoliceStation = require('./src/models/policeStationModel');
const Complaint = require('./src/models/complaintModel');
const Comment = require('./src/models/commentModel');
const Word = require('./src/models/wordModel');
const { getUserFromToken } = require('./src/utils/getUserFromToken');
const connectToDatabase = require('./src/utils/db');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: 'https://citizen-protection-service.vercel.app',
    credentials: true,
  })
);

async function initiateGraphQl() {
  const typeDefs = readFileSync(
    path.join(__dirname, './src/graphql/schema.graphql'),
    'utf8'
  );

  const context = async ({ req, res }) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const userInfo = await getUserFromToken(token);
    return {
      models: { User, PoliceStation, Complaint, Comment, Word },
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
