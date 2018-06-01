import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';

export function startGraphQLServer() {
    const app = express();
    app.use(cors());

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql'
    }));

    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

    app.listen(4000, () => console.log(`Express server running on port 4000`));
}

startGraphQLServer();
