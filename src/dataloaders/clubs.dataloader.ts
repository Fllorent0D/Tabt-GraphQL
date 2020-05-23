import {getRepository, In} from 'typeorm';
import {Club} from '../entities/Club';
import DataLoader from 'dataloader';
import {PlayerClub} from '../entities/PlayerClub';
import {SeasonInfo} from '../entities/SeasonInfo';

/* Load club by index */
const clubIndexBatch = async (indices: string[], season: SeasonInfo) => {

	const clubs = await getRepository(Club)
		.createQueryBuilder()
		.where(
			'indice IN (:indices) ' +
			'AND IFNULL(first_season, 0) <= :season ' +
			'AND IFNULL(last_season, :season) >= :season',
			{
				indices: indices,
				season: season.id
			}
		)
		.getMany();

	return indices.map((index) => clubs.find((club) => club.index === index));
};

export const clubIndexLoader = (season: SeasonInfo) => new DataLoader((ids: string[]) => clubIndexBatch(ids, season));


/* Club of Player dataloader - Load player of club  */

const clubMemberBatch = async (playerIds: number[], season: SeasonInfo): Promise<Club[]> => {

	const clubs = await getRepository(Club)
		.createQueryBuilder('cl')
		.leftJoinAndMapMany(
			'cl.players_club',
			PlayerClub,
			'player_club',
			'cl.id = player_club.club_id')
		.andWhere('player_club.season = :season AND player_club.player_id IN (:playerIds)', {
			season: season.id,
			playerIds: playerIds
		})
		.getMany();

	return playerIds.map((id) => clubs.find((club) => club.players_club.find(pc => pc.player_id === id)));
};

export const clubMemberLoader = (season: SeasonInfo) => new DataLoader((ids: number[]) => clubMemberBatch(ids, season));
