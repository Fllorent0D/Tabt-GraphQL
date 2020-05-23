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
import {ClubTeam} from './entities/ClubTeam';
import {TeamResolver} from './resolvers/team-resolver';
import {
	clubCategoryLoader,
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
	categoryDivisionsLoader, playerELOHistoryLoader, clubIdLoader
} from './dataloaders';
import {Request} from 'express';
import * as DataLoader from 'dataloader';
import {Division} from './entities/Division';
import {Level} from './entities/Level';
import {ClubCategory} from './entities/ClubCategory';
import {Venue} from './entities/Venue';
import {Club} from './entities/Club';
import {MatchResult, IndividualMatchResult} from './entities/MatchResult';
import {clubTeamLoader} from './dataloaders/teams.dataloader';
import {MatchInfo} from './entities/MatchInfo';
import {PlayerInfo} from './entities/PlayerInfo';
import {MatchPlayerListResolver} from './resolvers/match-player-list-resolver';
import {
	membersClubDataloader,
	playerListDataloader,
	playerRankingsDataloader,
	playerStatusLoader
} from './dataloaders/members.dataloader';
import {clubIndexLoader, clubMemberLoader} from './dataloaders/clubs.dataloader';
import {MatchPlayer} from './entities/MatchPlayer';
import {MatchSet} from './entities/MatchSet';
import {AuthUserResolver} from './resolvers/auth-user-resolver';
import {MatchSystemPlayer} from './entities/MatchSystemPlayer';
import {IndividualMatchResultResolver} from './resolvers/individual-match-result-resolver';
import {PlayerLastELO} from './entities/PlayerLastELO';
import {customAuthChecker, UserRights} from './middlewares/auth-checker';
import {ApolloServer} from "apollo-server-express";
import express from 'express';
import {ExpressContext} from 'apollo-server-express/dist/ApolloServer';
import {ApolloEngine} from 'apollo-engine';
import {GraphQLRequestContext} from 'apollo-server-types';
import {fieldExtensionsEstimator, getComplexity, simpleEstimator} from 'graphql-query-complexity';
import {separateOperations} from 'graphql';
import {CalendarTypeInfo} from './entities/CalendarTypeInfo';
import {CalendarDates} from './entities/CalendarDates';
import {calendarDatesLoader} from './dataloaders/calendar-dates.dataloader';
import {clubTeamMatchesLoader} from './dataloaders/match-info.dataloader';
import {PlayerStatus} from './entities/PlayerStatus';
import {PlayerClassement} from './entities/PlayerClassement';
import {DivisionCategory} from './entities/DivisionCategory';
import {PlayerELOHistory} from './entities/PlayerELOHistory';
import {PlayerEloHistoryResolver} from './resolvers/player-elo-history-resolver';
import {seasonRequest} from './middlewares/season-request';
import {SeasonInfo} from './entities/SeasonInfo';
require('dotenv').config();

export interface GraphQlContext {
	request: Request;
	season: SeasonInfo;
	claims: UserRights[],
	authenticated: boolean,
	divisionClubTeamsLoader: DataLoader<number, ClubTeam[], number>;
	levelDivisionLoader: DataLoader<number, Division[], number>;
	divisionLoader: DataLoader<number, Division, number>;
	categoryDivisionLoader: DataLoader<number, DivisionCategory, number>,
	clubIdLoader: DataLoader<number, Club, number>;
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
		context: (expressContext: ExpressContext) => {
			const season = expressContext.req['season'] as SeasonInfo;

			return {
				request: expressContext.req as Request,
				claims: expressContext.req['jwt']?.claims,
				season: season,
				authenticated: !!expressContext.req['jwt'],
				divisionClubTeamsLoader: divisionTeamsLoader(),
				levelDivisionLoader: levelDivisionsLoader(),
				clubIdLoader: clubIdLoader(),
				clubIndexLoader: clubIndexLoader(season),
				clubTeamsLoader: clubTeamsLoader(),
				levelLoader: levelLoader(),
				categoryLoader: clubCategoryLoader(),
				venueLoader: clubVenuesLoader(),
				matchResultsLoader: matchResultsLoader(),
				divisionMatchResultsLoader: divisionMatchResultsLoader(),
				clubTeamLoader: clubTeamLoader(),
				matchInfoLoader: matchInfoLoader(),
				memberLoader: memberLoader(),
				memberClubLoader: membersClubDataloader(season),
				clubMemberLoader: clubMemberLoader(season),
				playerListLoader: playerListDataloader(),
				matchSetsLoader: matchSetsLoader(),
				matchSystemPlayerLoader: matchSystemPlayerLoader(),
				divisionLoader: divisionsLoader(),
				categoryDivisionLoader: categoryDivisionsLoader(),
				playerELOLoader: playerELOLoader(),
				calendarTypeLoader: calendarTypeLoader(),
				calendarDatesLoader: calendarDatesLoader(),
				clubTeamMatchesLoader: clubTeamMatchesLoader(),
				playerStatusLoader: playerStatusLoader(season),
				playerRankingsLoader: playerRankingsDataloader(season),
				playerELOHistoryLoader: playerELOHistoryLoader()
			}
		},
	});

	const expressApp = express();
	expressApp.use('/graphql', verifyToken);
	expressApp.use('/graphql', seasonRequest);

	expressApp.use('/voyager', voyagerMiddleware({endpointUrl: '/graphql'}));

	server.applyMiddleware({app: expressApp, path: '/graphql'});

	// Init services
	console.log('Starting services...');

	// configure shared config settings
	expressApp.listen(process.env.PORT, () => console.log('Server is running on http://localhost:' + process.env.PORT));
};
start();
