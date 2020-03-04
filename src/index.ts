import 'reflect-metadata';
import {buildSchema} from 'type-graphql';
import {GraphQLServer} from 'graphql-yoga';
import {Container} from 'typedi';
import {verifyToken} from './middlewares/verify-token';
import {express as voyagerMiddleware} from 'graphql-voyager/middleware';
import {Connection, createConnection, getRepository, useContainer} from 'typeorm';
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
	clubVenuesLoader,
	levelDivisionsLoader,
	divisionTeamsLoader,
	levelLoader,
	matchResultsLoader,
	divisionMatchResultsLoader,
	matchInfoLoader,
	memberLoader,
	matchSetsLoader,
	matchSystemPlayerLoader, divisionsLoader, playerELOLoader
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
import {membersClubDataloader, playerListDataloader} from './dataloaders/members.dataloader';
import {clubIndexLoader, clubMemberLoader} from './dataloaders/clubs.dataloader';
import {MatchPlayer} from './entities/matchPlayer';
import {MatchSet} from './entities/matchSet';
import {AuthUser} from './entities/auth_user';
import * as crypto from 'crypto';
import {AuthUserResolver} from './resolvers/auth-user-resolver';
import {MatchSystemPlayer} from './entities/matchSystemPlayer';
import {IndividualMatchResultResolver} from './resolvers/IndividualMatchResult.resolver';
import {PlayerLastELO} from './entities/playerLastELO';
import {customAuthChecker, UserRights} from './middlewares/auth-checker';

export interface GraphQlContext {
	request: Request;
	claims: UserRights[],
	authenticated: boolean,
	divisionClubTeamsLoader: DataLoader<number, ClubTeam[], number>;
	levelDivisionLoader: DataLoader<number, Division[], number>;
	divisionLoader: DataLoader<number, Division, number>;
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
	playerELOLoader: DataLoader<number, PlayerLastELO>
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
			IndividualMatchResultResolver
		],
		container: Container,
		emitSchemaFile: true,
		globalMiddlewares: [],
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
		"database": "Tabt",
		"synchronize": false,
		"entities": [
			"src/entities/*.ts"
		],
		cache: true,
		logging: ["info", "error", "query"]
	});

	const server = new GraphQLServer({
		schema,
		context: ({request}) => ({
			request,
			claims: request['jwt']?.claims,
			authenticated: !!request['jwt'],
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
			playerELOLoader: playerELOLoader()
		} as GraphQlContext)
	});
	server.express.use('/graphql', verifyToken);
	server.express.use('/voyager', voyagerMiddleware({endpointUrl: '/graphql'}));
	// Init services
	console.log('Starting services...');

	server.start({
		endpoint: '/graphql',
		tracing: true
	}, () => console.log('Server is running on http://localhost:4000'));
};
start();
