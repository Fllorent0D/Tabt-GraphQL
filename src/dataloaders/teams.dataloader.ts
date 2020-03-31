// club_id#club_indice
import {getRepository, In, Repository} from 'typeorm';
import {ClubTeam} from '../entities/club-team';
import DataLoader from 'dataloader';

export const getClubTeamsBatch = async (ids: string[]) => {

	const whereConditions = ids.map((id) => {
		const [club_id, indice] = id.split('#');
		return {club_id, indice};
	});

	const entities = await getRepository(ClubTeam)
		.createQueryBuilder()
		.where(whereConditions)
		.getMany();

	return ids.map((entityId) => {
		const [club_id, indice] = entityId.split('#');
		return entities.find((entity) =>
			entity.club_id === Number(club_id) &&
			entity.indice === indice
		);
	});
};
export const clubTeamLoader = () => new DataLoader<string, ClubTeam>(getClubTeamsBatch);
