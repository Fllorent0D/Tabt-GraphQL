import {MatchResult} from '../entities/matchResult';
import {Ctx, FieldResolver, Info, Resolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {ClubTeam} from '../entities/club-team';
import {GraphQLResolveInfo} from 'graphql';
import {Club} from '../entities/club';
import {GraphQlContext} from '../index';
import {MatchInfo} from '../entities/matchInfo';
import {PlayerInfo} from '../entities/player-info';

@Resolver(MatchResult)
export class MatchResultResolver {
	constructor(
		@OrmRepository(MatchResult) private matchResultRepo: Repository<MatchResult>,
		@OrmRepository(ClubTeam) private clubTeamRepo: Repository<ClubTeam>
	) {
	}

	@FieldResolver(() => ClubTeam, {nullable: true})
	async homeTeam(
		@Root() matchResult: MatchResult,
		@Ctx() context: GraphQlContext): Promise<ClubTeam | null> {
		const matchInfo = await context.matchInfoLoader.load(matchResult.match_id);
		if (!matchInfo) {
			return null;
		}

		return context.clubTeamLoader.load(`${matchInfo.home_club}#${matchInfo.home_indice}`);
	}

	@FieldResolver(() => ClubTeam, {nullable: true})
	async awayTeam(
		@Root() matchResult: MatchResult,
		@Ctx() context: GraphQlContext): Promise<ClubTeam | null> {
		const matchInfo = await context.matchInfoLoader.load(matchResult.match_id);
		if (!matchInfo) {
			return null;
		}

		return context.clubTeamLoader.load(`${matchInfo.away_club}#${matchInfo.away_indice}`);
	}

	@FieldResolver(() => Boolean)
	scoreModified(@Root() matchResult: MatchResult) {
		return matchResult.score_modified === 'Y';
	}

	@FieldResolver(() => MatchInfo)
	async matchInfo(@Root() matchResult: MatchResult, @Ctx() context: GraphQlContext): Promise<MatchInfo | null> {
		return context.matchInfoLoader.load(matchResult.match_id);
	}

	@FieldResolver(() => PlayerInfo)
	async homeCaptain(@Root() matchResult: MatchResult, @Ctx() context: GraphQlContext): Promise<PlayerInfo | null> {
		const matchInfo = await context.matchInfoLoader.load(matchResult.match_id);
		if (!matchInfo || !matchInfo.home_captain_player_id) {
			return null;
		}
		return context.memberLoader.load(matchInfo.home_captain_player_id);
	}

	@FieldResolver(() => PlayerInfo)
	async awayCaptain(@Root() matchResult: MatchResult, @Ctx() context: GraphQlContext): Promise<PlayerInfo | null> {
		const matchInfo = await context.matchInfoLoader.load(matchResult.match_id);
		if (!matchInfo || !matchInfo.away_captain_player_id) {
			return null;
		}
		return context.memberLoader.load(matchInfo.away_captain_player_id);
	}

	@FieldResolver(() => PlayerInfo)
	async referee(@Root() matchResult: MatchResult, @Ctx() context: GraphQlContext): Promise<PlayerInfo | null> {
	  const matchInfo = await context.matchInfoLoader.load(matchResult.match_id);
		if (!matchInfo || !matchInfo.referee_player_id) {
			return null;
		}
		return context.memberLoader.load(matchInfo.referee_player_id);
	}

	@FieldResolver(() => PlayerInfo)
	async roomResponsible(@Root() matchResult: MatchResult, @Ctx() context: GraphQlContext): Promise<PlayerInfo | null> {
		const matchInfo = await context.matchInfoLoader.load(matchResult.match_id);
		if (!matchInfo || !matchInfo.room_responsible_player_id) {
			return null;
		}
		return context.memberLoader.load(matchInfo.room_responsible_player_id);
	}


}
