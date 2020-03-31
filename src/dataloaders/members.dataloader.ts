import DataLoader from 'dataloader';
import {PlayerInfo} from '../entities/player-info';
import {PlayerClub} from '../entities/playerClub';
import {CURRENT_SEASON} from '../index';
import {getRepository, In} from 'typeorm';
import {MatchPlayer} from '../entities/matchPlayer';


export const getMembersClubBatch = async (clubsIds: number[]) => {
	const players = await getRepository(PlayerInfo)
		.createQueryBuilder('player_info')
		.leftJoinAndMapOne(
			'player_info.player_club',
			PlayerClub,
			'pc',
			'player_info.id = pc.player_id')
		.where({
			'pc.season': CURRENT_SEASON,
			'pc.club_id': In(clubsIds)
		})
		.getMany();

	return clubsIds.map((clubId) => players.filter((player) => player.player_club.club_id === clubId));
};
export const membersClubDataloader = () => new DataLoader<number, PlayerInfo[], number>(getMembersClubBatch);


export const getPlayerListMatch = async (matchIds: number[]): Promise<MatchPlayer[][]> => {
	const players = await getRepository(MatchPlayer)
		.createQueryBuilder()
		.where({
			'match_id': In(matchIds)
		})
		.getMany();

	return matchIds.map((id: number) => players.filter(pm => pm.match_id === id));
};
export const playerListDataloader = () => new DataLoader(getPlayerListMatch);

