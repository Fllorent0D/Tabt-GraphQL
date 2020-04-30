import {Level} from '../entities/Level';
import {Arg, Ctx, Query, Resolver, Info, FieldResolver, Root} from 'type-graphql';
import {Division} from '../entities/Division';
import {IndividualMatchResult} from '../entities/MatchResult';
import {PlayerInfo} from '../entities/PlayerInfo';
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
