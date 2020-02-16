import {getRepository, In} from 'typeorm';
import {Club} from '../entities/club';
import DataLoader = require('dataloader');
import {PlayerInfo} from '../entities/player-info';
import {PlayerClub} from '../entities/playerClub';
import {CURRENT_SEASON} from '../index';

/* Load club by index */
const clubIndexBatch = async (indexes: string[]) => {

	const clubs = await getRepository(Club)
		.createQueryBuilder()
		.where({'index': In(indexes)})
		.getMany();

	return indexes.map((index) => clubs.find((club) => club.indice === index));
};

export const clubIndexLoader = () => new DataLoader(clubIndexBatch);


/* Club of Player dataloader - Load player of club  */

const clubMemberBatch = async (playerIds: number[]): Promise<Club[]> => {

	const clubs = await getRepository(Club)
		.createQueryBuilder('cl')
		.leftJoinAndMapMany(
			'cl.players_club',
			PlayerClub,
			'player_club',
			'cl.id = player_club.club_id')
		.where({
			'player_club.season': CURRENT_SEASON,
			'player_club.player_id': In(playerIds)
		})
		.getMany();

	return playerIds.map((id) => clubs.find((club) => club.players_club.find(pc => pc.player_id === id)));
};

export const clubMemberLoader = () => new DataLoader(clubMemberBatch);
