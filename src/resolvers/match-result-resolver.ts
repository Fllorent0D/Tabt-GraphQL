import {IndividualMatchResult, MatchPlayerList, MatchResult} from '../entities/MatchResult';
import {Ctx, FieldResolver, Resolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {ClubTeam} from '../entities/ClubTeam';
import {GraphQlContext} from '../index';
import {MatchInfo} from '../entities/MatchInfo';
import {NoPlayerIdRegisteredException, PlayerInfoOrNotUnion} from '../exceptions/NoPlayerIdRegisteredException';
import {MatchSet} from '../entities/MatchSet';
import {Division} from '../entities/Division';
import {CalendarDates} from '../entities/CalendarDates';
import moment from 'moment';
import {Club} from '../entities/Club';


@Resolver(MatchResult)
export class MatchResultResolver {

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

	@FieldResolver(() => ClubTeam, {nullable: true})
	async homeClub(
		@Root() matchResult: MatchResult,
		@Ctx() context: GraphQlContext): Promise<Club | null> {
		const matchInfo = await context.matchInfoLoader.load(matchResult.match_id);
		if (!matchInfo) {
			return null;
		}

		return context.clubIdLoader.load(matchInfo.home_club);
	}

	@FieldResolver(() => Club, {nullable: true})
	async awayClub(
		@Root() matchResult: MatchResult,
		@Ctx() context: GraphQlContext): Promise<Club | null> {
		const matchInfo = await context.matchInfoLoader.load(matchResult.match_id);
		if (!matchInfo) {
			return null;
		}

		return context.clubIdLoader.load(matchInfo.away_club);
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
			division_id: match.div_id,
			player_id: player.away_player_id,
			isWalkover: player.away_wo === 1,
			player: null,
			position: player.player_nb,
			victory: player.away_vict
		}));
	}

	@FieldResolver(() => [MatchPlayerList])
	async homePlayers(@Root()match: MatchResult, @Ctx() context: GraphQlContext): Promise<MatchPlayerList[]> {
		const matchPlayer = await context.playerListLoader.load(match.match_id);
		return matchPlayer.map<MatchPlayerList>((player, index) => ({
			division_id: match.div_id,
			player_id: player.home_player_id,
			isWalkover: player.home_wo === 1,
			player: null,
			position: player.player_nb,
			victory: player.home_vict
		}));
	}

	@FieldResolver(() => [IndividualMatchResult])
	async individualsMatchResults(@Root()match: MatchResult, @Ctx() context: GraphQlContext): Promise<IndividualMatchResult[]> {
		const sets = await context.matchSetsLoader.load(match.match_id);
		const matchPlayers = await context.playerListLoader.load(match.match_id);
		const matchInfo = await context.matchInfoLoader.load(match.match_id);
		const matchSystem = await context.matchSystemPlayerLoader.load(matchInfo.match_type_id);

		const toPoints = (points: number, position: 'away' | 'home', maxSetPoints: number = 11) => {
			if (position === 'away') {
				if (points === -126)
					return 0;
				if (points < 0) {
					return points * -1;
				}
				return maxSetPoints;
			}
			if (position === 'home') {
				if (points === 126)
					return 0;
				if (points > 0) {
					return points;
				}
				return maxSetPoints;
			}
		};

		const maxSetPointForMatchType = 11; // TO DO: Change depending on match type

		return sets.reduce<IndividualMatchResult[]>((acc: IndividualMatchResult[], currentVal: MatchSet) => {
			if (!acc[currentVal.game_id]) {
				const gameMatchSystem = matchSystem.find((matchSystem) => matchSystem.game_nb === currentVal.game_id);

				acc[currentVal.game_id] = {
					matchNumber: currentVal.game_id,
					homePlayerIndex: matchPlayers.find((player) => player.player_nb === gameMatchSystem.home_player).home_player_id,
					homeSets: 0,
					awayPlayerIndex: matchPlayers.find((player) => player.player_nb === gameMatchSystem.away_player).away_player_id,
					awaySets: 0,
					sets: []
				};
			}

			acc[currentVal.game_id].sets[currentVal.set_id] = {
				setNumber: currentVal.set_id,
				awayPoints: toPoints(currentVal.points, 'away', maxSetPointForMatchType),
				awayWO: currentVal.away_wo === 1,
				homePoints: toPoints(currentVal.points, 'home', maxSetPointForMatchType),
				homeWO: currentVal.home_wo === 1
			};

			if (acc[currentVal.game_id].sets[currentVal.set_id].awayPoints > acc[currentVal.game_id].sets[currentVal.set_id].homePoints) {
				acc[currentVal.game_id].awaySets = acc[currentVal.game_id].awaySets + 1;
			} else {
				acc[currentVal.game_id].homeSets = acc[currentVal.game_id].homeSets + 1;
			}

			return acc;
		}, []);
	}


	@FieldResolver(() => Date)
	async date(@Root() match: MatchResult, @Ctx() context: GraphQlContext): Promise<Date> {
		const matchInfo: MatchInfo = await context.matchInfoLoader.load(match.match_id);
		if (!matchInfo.home_club || !matchInfo.away_club) {
			return null;
		}
		const division: Division = await context.divisionLoader.load(match.div_id);
		const dates: CalendarDates = await context.calendarDatesLoader.load(`${division.calendardate_id}#${match.week}`)
		const homeTeam: ClubTeam = await context.clubTeamLoader.load(`${matchInfo.home_club}#${matchInfo.home_indice}`);
		const matchDate = moment(dates.date, 'YYYY-MM-DD');
		if(homeTeam.hour){
			const [hour, minutes, seconds] = homeTeam.hour.split(':').map(Number);
			matchDate.hour(hour).minutes(minutes).second(seconds)
		}

		return matchDate.toDate()
	}

	@FieldResolver(() => Division)
	async division(@Root() match: MatchResult, @Ctx() context: GraphQlContext): Promise<Division> {
		return context.divisionLoader.load(match.div_id);
	}

	@FieldResolver(() => String)
	score(@Root() match: MatchResult): string {
		return `${match.homeScore}-${match.awayScore}`;
	}

}
