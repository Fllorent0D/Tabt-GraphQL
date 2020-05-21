import {Arg, Ctx, FieldResolver, Info, Query, Resolver, Root} from 'type-graphql';
import {ClubTeam} from '../entities/ClubTeam';
import {GraphQLError, GraphQLResolveInfo} from 'graphql';
import {Club} from '../entities/Club';
import {Division} from '../entities/Division';
import {GraphQlContext} from '../index';
import {MatchResult} from '../entities/MatchResult';
import {getRepository} from 'typeorm';

@Resolver(ClubTeam)
export class TeamResolver {

	@Query(() => [ClubTeam])
	async teams(
		@Ctx() context: GraphQlContext,
		@Arg('clubId', {nullable: false}) clubId?: string
	): Promise<ClubTeam[]> {
		return context.clubTeamsLoader.load(Number(clubId));
	}

	@FieldResolver(() => [MatchResult])
	async matches(@Root() team: ClubTeam, @Ctx() context: GraphQlContext): Promise<MatchResult[]> {
		return context.clubTeamMatchesLoader.load(`${team.club_id}#${team.indice}`);
	}
}
