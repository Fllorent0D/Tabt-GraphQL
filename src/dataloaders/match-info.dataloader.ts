import {CalendarDates} from '../entities/calendarDates';
import {getRepository} from 'typeorm';
import DataLoader from 'dataloader';
import {MatchInfo} from '../entities/matchInfo';

const clubTeamMatchesBatch = async (ids: string[]): Promise<CalendarDates[]> => {
	const whereConditions = ids.map((id) => {
		const [club, indice] = id.split('#');
		return {
			"home_club": club,
			"home_indice": indice
		};
	});

	const entities = await getRepository(MatchInfo)
		.createQueryBuilder()
		.where(whereConditions)
		.getMany();

	return ids.map((entityId) => {
		const [id, week] = entityId.split('#');
		return entities.find((entity) =>
			entity.calendardate_id === Number(id) &&
			entity.week === Number(week)
		);
	});
};

export const clubTeamMatchesLoader = () => new DataLoader(clubTeamMatchesBatch);
