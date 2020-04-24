import {Level} from '../entities/level';
import {Arg, Ctx, Query, Resolver, Info, FieldResolver, Root} from 'type-graphql';
import {Division} from '../entities/division';
import {IndividualMatchResult} from '../entities/matchResult';
import {PlayerInfo} from '../entities/player-info';
import {GraphQlContext} from '../index';

@Resolver(IndividualMatchResult)
export class IndividualMatchResultResolver {

	@FieldResolver(() => PlayerInfo)
	async awayPlayer(@Root() individualMatchResultEntry: IndividualMatchResult, @Ctx() context: GraphQlContext): Promise<PlayerInfo> {
		return context.memberLoader.load(individualMatchResultEntry.homePlayerIndex);
	}

	@FieldResolver(() => PlayerInfo)
	async homePlayer(@Root() individualMatchResultEntry: IndividualMatchResult, @Ctx() context: GraphQlContext): Promise<PlayerInfo> {
		return context.memberLoader.load(individualMatchResultEntry.homePlayerIndex);
	}


}
