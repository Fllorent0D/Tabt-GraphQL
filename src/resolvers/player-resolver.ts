import {Arg, Ctx, Field, FieldResolver, Query, Resolver, Root} from 'type-graphql';
import {PlayerInfo} from '../entities/PlayerInfo';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {PlayerClub} from '../entities/PlayerClub';
import {getRepository, Repository} from 'typeorm';
import {Club} from '../entities/Club';
import {GraphQlContext} from '../index';
import {PlayerRanking} from '../entities/PlayerClassement';
import {PlayerELOHistory} from '../entities/PlayerELOHistory';

@Resolver(PlayerInfo)
export class PlayerInfoResolver {
	@Query(() => [PlayerInfo], {description: "Returns list of players"})
	async players(@Arg('index')id: number): Promise<PlayerInfo[]> {
		const query = getRepository(PlayerInfo).createQueryBuilder();
		if (id) {
			query.where({index: id});
		}
		return query.getMany();
	}

	@FieldResolver(returns => Club)
	async club(@Root() playerInfo: PlayerInfo, @Ctx() context: GraphQlContext): Promise<Club> {
		return context.clubMemberLoader.load(playerInfo.id);
	}

	@FieldResolver(returns => Number, {nullable: true})
	async elo(@Root() playerInfo: PlayerInfo, @Ctx() context: GraphQlContext): Promise<number | null> {
		const lastElo = await context.playerELOLoader.load(playerInfo.id);
		return lastElo.points;
	}

	@FieldResolver(returns => [PlayerRanking], {nullable: true})
	async rankings(@Root() playerInfo: PlayerInfo, @Ctx() context: GraphQlContext): Promise<PlayerRanking[]> {
		const rankings = await context.playerRankingsLoader.load(playerInfo.id);
		const mapped: PlayerRanking[] = rankings.map((ranking) => new PlayerRanking(
			ranking.player_classement?.name ? ranking.player_classement.name : '',
			ranking.player_category.sex,
			ranking.player_category.name,
			ranking.player_category.short_name
		));
		return mapped;
	}

	@FieldResolver(returns => String)
	async status(@Root() playerInfo: PlayerInfo, @Ctx() context: GraphQlContext): Promise<string> {
		const playerStatus = await context.playerStatusLoader.load(playerInfo.id);
		return playerStatus?.statusId || 'A';
	}

	@FieldResolver(returns => [PlayerELOHistory], {nullable: true})
	async eloHistory(@Root() playerInfo: PlayerInfo, @Ctx() context: GraphQlContext): Promise<PlayerELOHistory[]> {
		const elos = await context.playerELOHistoryLoader.load(playerInfo.id);
		return elos.sort((a, b) => a > b ? -1 : a < b ? 1 : 0).slice(0, 9);
	}


}
