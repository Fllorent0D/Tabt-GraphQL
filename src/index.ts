import 'reflect-metadata';
import {buildSchema} from 'type-graphql';
import {GraphQLServer} from 'graphql-yoga';
import {Container} from 'typedi';
import {TestMiddleware} from './middlewares/test-middleware';
import {express as voyagerMiddleware} from 'graphql-voyager/middleware';
import {Connection, createConnection, useContainer} from 'typeorm';
import {ClubResolver} from './resolvers/club-resolver';
import {PlayerInfoResolver} from './resolvers/player-resolver';
import {LevelResolver} from './resolvers/level-resolver';
import {ClubCategoryResolver} from './resolvers/club-category-resolver';
import {DivisionResolver} from './resolvers/division-resolver';
import {MatchResultResolver} from './resolvers/match-result-resolver';
import {GraphQLDatabaseLoader} from '@mando75/typeorm-graphql-loader';
import {ClubTeam} from './entities/club-team';
import {TeamResolver} from './resolvers/team-resolver';
import {
  clubCategoryLoader,
  clubLoader,
  clubTeamsLoader,
  clubVenueLoader,
  divisionTeamsLoader,
  levelLoader
} from './dataloaders';

const start = async () => {

  console.clear();

  const schema = await buildSchema({
    resolvers: [
      ClubResolver,
      PlayerInfoResolver,
      LevelResolver,
      ClubCategoryResolver,
      DivisionResolver,
      MatchResultResolver,
      TeamResolver
    ],
    container: Container,
    emitSchemaFile: true,
    globalMiddlewares: [TestMiddleware],
    nullableByDefault: true,
  });

  useContainer(Container);

  const connection: Connection = await createConnection({
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "myRootpwd32",
    "database": "tabt",
    "synchronize": false,
    "entities": [
      "src/entities/*.ts"
    ],
    cache: true,
    logging: ["info", "error", "query"]
  });

  const server = new GraphQLServer({
    schema,
    context: (request) => ({
      request,
      loader: new GraphQLDatabaseLoader(connection),
      divisionClubTeamsLoader: divisionTeamsLoader(),
      clubLoader: clubLoader(),
      clubTeamsLoader: clubTeamsLoader(),
      levelLoader: levelLoader(),
      categoryLoader: clubCategoryLoader(),
      venueLoader: clubVenueLoader()
    })
  });

  server.express.use('/voyager', voyagerMiddleware({endpointUrl: '/graphql'}));
  // Init services
  console.log('Starting services...');

  server.start({
    endpoint: '/graphql',
    tracing: true
  }, () => console.log('Server is running on http://localhost:4000'));
};
start();

