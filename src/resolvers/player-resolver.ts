import {Ctx, FieldResolver, Resolver, Root} from 'type-graphql';
import {PlayerInfo} from '../entities/player-info';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {PlayerClub} from '../entities/playerClub';
import {Repository} from 'typeorm';
import {Club} from '../entities/club';
import {GraphQlContext} from '../index';

@Resolver(PlayerInfo)
export class PlayerInfoResolver {
	@FieldResolver(returns => Club)
	async club(@Root() playerInfo: PlayerInfo, @Ctx() context: GraphQlContext): Promise<Club> {
		return context.clubMemberLoader.load(playerInfo.id);
	}

	@FieldResolver(returns => Number, {nullable: true})
	async elo(@Root() playerInfo: PlayerInfo, @Ctx() context: GraphQlContext): Promise<number | null> {
		const lastElo = await context.playerELOLoader.load(playerInfo.id);
		return lastElo?.points;
	}



}
