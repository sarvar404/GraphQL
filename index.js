import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';

// graph
import { ApolloServer,gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

//fakedb

import { quotes, users } from './fakedb.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;




// // TESTING API,

// app.get("/", (request, response)=> {
//     response.send("App is running on")
// });


// schema

const typeDefs = gql`

    type Query {
        users : [User]
    }

    type User {
        id: ID
        firstName : String
        lastName : String
        email : String
        password : String
    }

`

const resolvers = {
    Query : {
        users: () => users,
    }
}

const server = new ApolloServer({

    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});




server.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});