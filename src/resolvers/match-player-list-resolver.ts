import {Ctx, FieldResolver, Resolver, Root} from 'type-graphql';

import {MatchPlayerList} from '../entities/matchResult';
import {GraphQlContext} from '../index';
import {PlayerInfo} from '../entities/player-info';

@Resolver(MatchPlayerList)
export class MatchPlayerListResolver {

	@FieldResolver(() => PlayerInfo)
	player(@Root() matchPlayerList: MatchPlayerList, @Ctx() context: GraphQlContext): Promise<PlayerInfo | null> {
		if(matchPlayerList.player_id){
			return context.memberLoader.load(matchPlayerList.player_id);
		} else {
			return null;
		}
	}
}
