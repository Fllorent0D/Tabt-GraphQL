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

const start = async () => {
  const schema = await buildSchema({
    resolvers: [
      MemberResolver,
      ClubResolver,
      PlayerResultResolver,
      TeamMatchResolver,
      DivisionResolver,
      RankingEntryResolver,
      TeamResolver
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

  //Init services
  console.log('Starting services...');

  server.start(() => console.log('Server is running on http://localhost:4000'))

};
start();
