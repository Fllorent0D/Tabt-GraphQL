import {getRepository, In} from 'typeorm';
import DataLoader from 'dataloader';
import {CalendarDates} from '../entities/calendarDates';

const calendarDatesBatch = async (ids: string[]): Promise<CalendarDates[]> => {
	const whereConditions = ids.map((id) => {
		const [calendarId, week] = id.split('#');
		return {
			"calendardate_id": calendarId,
			"week": week
		};
	});

	const entities = await getRepository(CalendarDates)
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

export const calendarDatesLoader = () => new DataLoader(calendarDatesBatch);
