import {Ctx, FieldResolver, Resolver, Root} from 'type-graphql';

import {MatchPlayerList} from '../entities/MatchResult';
import {GraphQlContext} from '../index';
import {PlayerInfo} from '../entities/PlayerInfo';
import {PlayerClassement} from '../entities/PlayerClassement';
import {DivisionCategory} from '../entities/DivisionCategory';

@Resolver(MatchPlayerList)
export class MatchPlayerListResolver {

	@FieldResolver(() => PlayerInfo)
	player(@Root() matchPlayerList: MatchPlayerList, @Ctx() context: GraphQlContext): Promise<PlayerInfo | null> {
		if (matchPlayerList.player_id) {
			return context.memberLoader.load(matchPlayerList.player_id);
		} else {
			return null;
		}
	}


	@FieldResolver(() => PlayerInfo)
	async ranking(@Root() matchPlayerList: MatchPlayerList, @Ctx() context: GraphQlContext): Promise<string | null> {
		const division = await context.divisionLoader.load(matchPlayerList.division_id);
		const [divisionCategory, playerRanking]: [DivisionCategory, PlayerClassement[]] = await Promise.all([
			context.categoryDivisionLoader.load(division.category_id),
			context.playerRankingsLoader.load(matchPlayerList.player_id)
		]);
		const divisionRankingCategory = divisionCategory.classementcategory;
		const rankingCategory = playerRanking.find(ranking => ranking.category === divisionRankingCategory);
		return rankingCategory?.player_classement?.name;
	}


}
