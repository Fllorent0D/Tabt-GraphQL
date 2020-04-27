import 'reflect-metadata';
import {buildSchema} from 'type-graphql';
import {Container} from 'typedi';
import {verifyToken} from './middlewares/verify-token';
import {express as voyagerMiddleware} from 'graphql-voyager/middleware';
import {Connection, createConnection, useContainer} from 'typeorm';
import {ClubResolver} from './resolvers/club-resolver';
import {PlayerInfoResolver} from './resolvers/player-resolver';
import {LevelResolver} from './resolvers/level-resolver';
import {ClubCategoryResolver} from './resolvers/club-category-resolver';
import {DivisionResolver} from './resolvers/division-resolver';
import {MatchResultResolver} from './resolvers/match-result-resolver';
import {ClubTeam} from './entities/club-team';
import {TeamResolver} from './resolvers/team-resolver';
import {
	clubCategoryLoader,
	clubLoader,
	clubTeamsLoader,
	clubVenuesLoader,
	levelDivisionsLoader,
	divisionTeamsLoader,
	levelLoader,
	matchResultsLoader,
	divisionMatchResultsLoader,
	matchInfoLoader,
	memberLoader,
	matchSetsLoader,
	matchSystemPlayerLoader,
	divisionsLoader,
	playerELOLoader,
	calendarTypeLoader,
	playerStatusLoader,
	categoryDivisionsLoader, playerELOHistoryLoader
} from './dataloaders';
import {Request} from 'express';
import * as DataLoader from 'dataloader';
import {Division} from './entities/division';
import {Level} from './entities/level';
import {ClubCategory} from './entities/club-category';
import {Venue} from './entities/venue';
import {Club} from './entities/club';
import {MatchResult, IndividualMatchResult} from './entities/matchResult';
import {clubTeamLoader} from './dataloaders/teams.dataloader';
import {MatchInfo} from './entities/matchInfo';
import {PlayerInfo} from './entities/player-info';
import {MatchPlayerListResolver} from './resolvers/match-player-list-resolver';
import {membersClubDataloader, playerListDataloader, playerRankingsDataloader} from './dataloaders/members.dataloader';
import {clubIndexLoader, clubMemberLoader} from './dataloaders/clubs.dataloader';
import {MatchPlayer} from './entities/matchPlayer';
import {MatchSet} from './entities/matchSet';
import {AuthUserResolver} from './resolvers/auth-user-resolver';
import {MatchSystemPlayer} from './entities/matchSystemPlayer';
import {IndividualMatchResultResolver} from './resolvers/individual-match-result-resolver';
import {PlayerLastELO} from './entities/playerLastELO';
import {customAuthChecker, UserRights} from './middlewares/auth-checker';
import {ApolloServer} from "apollo-server-express";
import express from 'express';
import {ExpressContext} from 'apollo-server-express/dist/ApolloServer';
import {ApolloEngine} from 'apollo-engine';
import {GraphQLRequestContext} from 'apollo-server-types';
import {fieldExtensionsEstimator, getComplexity, simpleEstimator} from 'graphql-query-complexity';
import {separateOperations} from 'graphql';
import {CalendarTypeInfo} from './entities/calendarTypeInfo';
import {CalendarDates} from './entities/calendarDates';
import {calendarDatesLoader} from './dataloaders/calendar-dates.dataloader';
import {clubTeamMatchesLoader} from './dataloaders/match-info.dataloader';
import {PlayerStatus} from './entities/playerStatus';
import {PlayerClassement} from './entities/playerClassement';
import {DivisionCategory} from './entities/division-category';
import {PlayerELOHistory} from './entities/playerELOHistory';
import {PlayerEloHistoryResolver} from './resolvers/player-elo-history-resolver';
require('dotenv').config();

export interface GraphQlContext {
	request: Request;
	claims: UserRights[],
	authenticated: boolean,
	divisionClubTeamsLoader: DataLoader<number, ClubTeam[], number>;
	levelDivisionLoader: DataLoader<number, Division[], number>;
	divisionLoader: DataLoader<number, Division, number>;
	categoryDivisionLoader: DataLoader<number, DivisionCategory, number>,
	clubLoader: DataLoader<number, Club, number>;
	clubIndexLoader: DataLoader<string, Club, string>;
	clubTeamsLoader: DataLoader<number, ClubTeam[], number>;
	levelLoader: DataLoader<number, Level, number>;
	categoryLoader: DataLoader<number, ClubCategory, number>;
	venueLoader: DataLoader<number, Venue[], number>,
	matchResultsLoader: DataLoader<number, MatchResult[], number>,
	divisionMatchResultsLoader: DataLoader<number, MatchResult[]>,
	clubTeamLoader: DataLoader<string, ClubTeam>,
	matchInfoLoader: DataLoader<any, MatchInfo>,
	memberLoader: DataLoader<number, PlayerInfo>,
	memberClubLoader: DataLoader<number, PlayerInfo[], number>
	clubMemberLoader: DataLoader<number, Club, number>;
	playerListLoader: DataLoader<number, MatchPlayer[], number>;
	matchSetsLoader: DataLoader<number, MatchSet[], number>
	matchSystemPlayerLoader: DataLoader<number, MatchSystemPlayer[], number>,
	playerELOLoader: DataLoader<number, PlayerLastELO>,
	calendarTypeLoader: DataLoader<number, CalendarTypeInfo>,
	calendarDatesLoader: DataLoader<string, CalendarDates>,
	clubTeamMatchesLoader: DataLoader<string, MatchResult[]>
	playerStatusLoader: DataLoader<number, PlayerStatus>,
	playerRankingsLoader: DataLoader<number, PlayerClassement[]>
	playerELOHistoryLoader: DataLoader<number, PlayerELOHistory[]>
}

export const CURRENT_SEASON = 17;

const start = async () => {

	console.clear();

	const schema = await buildSchema({
		authChecker: customAuthChecker,
		resolvers: [
			ClubResolver,
			PlayerInfoResolver,
			LevelResolver,
			ClubCategoryResolver,
			DivisionResolver,
			MatchResultResolver,
			TeamResolver,
			MatchPlayerListResolver,
			AuthUserResolver,
			IndividualMatchResultResolver,
			PlayerEloHistoryResolver
		],
		container: Container,
		emitSchemaFile: true,
		globalMiddlewares: [],
		nullableByDefault: true
	});

	useContainer(Container);

	const connection: Connection = await createConnection({
		"name": "default",
		"type": "mysql",
		"host": process.env.DB_HOST,
		"port": Number(process.env.DB_PORT),
		"username": process.env.DB_USERNAME,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_NAME,
		"synchronize": false,
		"entities": [
			__dirname + "/entities/{*.ts,*.js}"
		],
		cache: true,
		logging: ["error", "query"]
	});

	const server = new ApolloServer({
		schema,
		cacheControl: {
			defaultMaxAge: 5
		},
		tracing: true,
		engine: Boolean(process.env.USE_APOLLO_ENGINE) ? {
			apiKey: process.env.APOLLO_ENGINE_API_KEY,
			schemaTag: process.env.APOLLO_SCHEMA_TAG,
			debugPrintReports: true,
			generateClientInfo: (requestContext: GraphQLRequestContext<ExpressContext>) => {
				const headers = requestContext.context.req && requestContext.context.req['headers'];
				if(headers) {
					return {
						clientName: headers['tabt-client-name'],
						clientVersion: headers['tabt-client-version'],
					};
				} else {
					return {
						clientName: "Unknown Client",
						clientVersion: "Unversioned",
					};
				}
			}
		} : null,
		plugins: [
			{
				requestDidStart: () => ({
					didResolveOperation({ request, document }) {
						const complexity = getComplexity({
							schema,
							query: request.operationName
								? separateOperations(document)[request.operationName]
								: document,
							variables: request.variables,
							estimators: [
								fieldExtensionsEstimator(),
								simpleEstimator({ defaultComplexity: 1 }),
							],
						});
						// Here we can react to the calculated complexity,
						// like compare it with max and throw error when the threshold is reached.
						if (complexity >= 20) {
							throw new Error(
								`Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`,
							);
						}
						// And here we can e.g. subtract the complexity point from hourly API calls limit.
						console.log("Used query complexity points:", complexity);
					},
				}),
			},
		],
		context: (expressContext: ExpressContext) => ({
			request: expressContext.req as Request,
			claims: expressContext.req['jwt']?.claims,
			authenticated: !!expressContext.req['jwt'],
			divisionClubTeamsLoader: divisionTeamsLoader(),
			levelDivisionLoader: levelDivisionsLoader(),
			clubLoader: clubLoader(),
			clubIndexLoader: clubIndexLoader(),
			clubTeamsLoader: clubTeamsLoader(),
			levelLoader: levelLoader(),
			categoryLoader: clubCategoryLoader(),
			venueLoader: clubVenuesLoader(),
			matchResultsLoader: matchResultsLoader(),
			divisionMatchResultsLoader: divisionMatchResultsLoader(),
			clubTeamLoader: clubTeamLoader(),
			matchInfoLoader: matchInfoLoader(),
			memberLoader: memberLoader(),
			memberClubLoader: membersClubDataloader(),
			clubMemberLoader: clubMemberLoader(),
			playerListLoader: playerListDataloader(),
			matchSetsLoader: matchSetsLoader(),
			matchSystemPlayerLoader: matchSystemPlayerLoader(),
			divisionLoader: divisionsLoader(),
			categoryDivisionLoader: categoryDivisionsLoader(),
			playerELOLoader: playerELOLoader(),
			calendarTypeLoader: calendarTypeLoader(),
			calendarDatesLoader: calendarDatesLoader(),
			clubTeamMatchesLoader: clubTeamMatchesLoader(),
			playerStatusLoader: playerStatusLoader(),
			playerRankingsLoader: playerRankingsDataloader(),
			playerELOHistoryLoader: playerELOHistoryLoader()
		}),
	});

	const expressApp = express();
	expressApp.use('/graphql', verifyToken);
	expressApp.use('/voyager', voyagerMiddleware({endpointUrl: '/graphql'}));

	server.applyMiddleware({app: expressApp, path: '/graphql'});

	// Init services
	console.log('Starting services...');

	// configure shared config settings
	expressApp.listen(process.env.PORT, () => console.log('Server is running on http://localhost:4000'));
};
start();
