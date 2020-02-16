import {MatchPlayerList, MatchResult} from '../entities/matchResult';
import {Ctx, Field, FieldResolver, Info, Query, Resolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {ClubTeam} from '../entities/club-team';
import {GraphQlContext} from '../index';
import {MatchInfo} from '../entities/matchInfo';
import {NoPlayerIdRegisteredException, PlayerInfoOrNotUnion} from '../exceptions/NoPlayerIdRegisteredException';

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

	@FieldResolver(() => PlayerInfoOrNotUnion)
	async homeCaptain(@Root()match: MatchResult, @Ctx() context: GraphQlContext): Promise<typeof PlayerInfoOrNotUnion> {
		const matchInfo = await context.matchInfoLoader.load(match.match_id);
		if (!matchInfo || !matchInfo.home_captain_player_id) {
			return new NoPlayerIdRegisteredException('No player registered as home captain');
		}
		return context.memberLoader.load(matchInfo.home_captain_player_id);
	}

	@FieldResolver(() => PlayerInfoOrNotUnion)
	async awayCaptain(@Root()match: MatchResult, @Ctx() context: GraphQlContext): Promise<typeof PlayerInfoOrNotUnion> {
		const matchInfo = await context.matchInfoLoader.load(match.match_id);
		if (!matchInfo || !matchInfo.away_captain_player_id) {
			return new NoPlayerIdRegisteredException('No player registered as away captain');
		}
		return context.memberLoader.load(matchInfo.away_captain_player_id);
	}

	@FieldResolver(() => PlayerInfoOrNotUnion)
	async referee(@Root()match: MatchResult, @Ctx() context: GraphQlContext): Promise<typeof PlayerInfoOrNotUnion> {
		const matchInfo = await context.matchInfoLoader.load(match.match_id);
		if (!matchInfo || !matchInfo.referee_player_id) {
			return new NoPlayerIdRegisteredException('No player registered as referee');
		}
		return context.memberLoader.load(matchInfo.referee_player_id);
	}

	@FieldResolver(() => PlayerInfoOrNotUnion)
	async roomResponsible(@Root()match: MatchResult, @Ctx() context: GraphQlContext): Promise<typeof PlayerInfoOrNotUnion> {
		const matchInfo = await context.matchInfoLoader.load(match.match_id);
		if (!matchInfo || !matchInfo.room_responsible_player_id) {
			return new NoPlayerIdRegisteredException('No player registered as room responsible');
		}
		return context.memberLoader.load(matchInfo.room_responsible_player_id);
	}

	@FieldResolver(() => [MatchPlayerList])
	async awayPlayers(@Root()match: MatchResult, @Ctx() context: GraphQlContext): Promise<MatchPlayerList[]> {
		const matchPlayer = await context.playerListLoader.load(match.match_id);
		return matchPlayer.map<MatchPlayerList>((player) => ({
			player_id: player.away_player_id,
			isWalkover: player.away_wo === 1,
			player: null
		}));
	}

	@FieldResolver(() => [MatchPlayerList])
	async homePlayers(@Root()match: MatchResult, @Ctx() context: GraphQlContext): Promise<MatchPlayerList[]> {
		const matchPlayer = await context.playerListLoader.load(match.match_id);
		return matchPlayer.map<MatchPlayerList>((player) => ({
			player_id: player.home_player_id,
			isWalkover: player.home_wo === 1,
			player: null
		}));
	}

}
