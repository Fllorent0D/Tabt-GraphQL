import "reflect-metadata";
import {MemberResolver} from "./resolvers/MemberResolver";
import {buildSchema} from "type-graphql";
import {GraphQLServer} from "graphql-yoga";
import {Container} from "typedi";
import {TestMiddleware} from "./middlewares/test-middleware";
import {ClubResolver} from "./resolvers/ClubResolver";
import {TabtService} from "./tabt/tabt.service";
import {PlayerResultResolver} from "./resolvers/PlayerResultResolver";
import {TeamMatchResolver} from "./resolvers/TeamMatchResolver";
import {DivisionResolver} from "./resolvers/DivisionResolver";
import {RankingEntryResolver} from "./resolvers/RankingEntryResolver";
import {TeamResolver} from "./resolvers/TeamResolver";
import {IndividualMatchResultResolver} from "./resolvers/IndividualMatchResultResolver";
import {TournamentResolver} from "./resolvers/TournamentResolver";
import {TeamMatchPlayerRqlesolver} from "./resolvers/TeamMatchPlayerResolver";
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

const start = async () => {
  const schema = await buildSchema({
    resolvers: [
      MemberResolver,
      ClubResolver,
      PlayerResultResolver,
      TeamMatchResolver,
      DivisionResolver,
      RankingEntryResolver,
      TeamResolver,
      IndividualMatchResultResolver,
      TournamentResolver,
      TeamMatchPlayerResolver
    ],
    container: Container,
    emitSchemaFile: true,
    globalMiddlewares: [TestMiddleware],
    nullableByDefault: true
  });

  const server = new GraphQLServer({
    schema,
    context: (request) => ({request})
  });

  server.express.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
  //Init services
  console.log('Starting services...');

  server.start({
    endpoint: '/graphql'
  }, () => console.log('Server is running on http://localhost:4000'))

};
start();
