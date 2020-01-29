
import {Ctx, FieldResolver, Resolver, Root} from 'type-graphql';

import {MatchInfo} from '../entities/matchInfo';
import {MatchResult} from '../entities/matchResult';
import {GraphQlContext} from '../index';
import {PlayerInfo} from '../entities/player-info';

@Resolver(MatchInfo)
export class MatchInfoResolver {
	constructor() {
	}


}
