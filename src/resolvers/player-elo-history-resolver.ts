import {FieldResolver, Resolver, Root} from 'type-graphql';
import {PlayerELOHistory} from '../entities/playerELOHistory';
import moment from 'moment';

@Resolver(PlayerELOHistory)
export class PlayerEloHistoryResolver {
	@FieldResolver(() => Date)
	date(@Root() playerELOHistory: PlayerELOHistory): Date {
		return moment(playerELOHistory.dateString, 'YYYY-MM-DD').hours(0).minute(0).second(0).toDate();
	}

}
