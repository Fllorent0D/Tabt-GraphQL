import DataLoader from 'dataloader';
import {PlayerInfo} from '../entities/PlayerInfo';
import {PlayerClub} from '../entities/PlayerClub';
import {CURRENT_SEASON} from '../index';
import {getRepository, In} from 'typeorm';
import {MatchPlayer} from '../entities/MatchPlayer';
import {PlayerClassement} from '../entities/PlayerClassement';
import {PlayerCategory} from '../entities/PlayerCategory';
import {ClassementInfo} from '../entities/ClassementInfo';


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

export const playerRankingsBatch = async (playerIds: number[]): Promise<PlayerClassement[][]> => {
	const players = await getRepository(PlayerClassement)
		.createQueryBuilder('pcl')
		.leftJoinAndMapOne(
			'pcl.player_category',
			PlayerCategory,
			'pc',
			'pcl.category = pc.id')
		.leftJoinAndMapOne(
			'pcl.player_classement',
			ClassementInfo,
			'ci',
			'pcl.classement_id = ci.id')
		.where({
			'player_id': In(playerIds),
			'season': CURRENT_SEASON,
		})
		.getMany();

	return playerIds.map((id: number) => players.filter(pm => pm.player_id === id));
};
export const playerRankingsDataloader = () => new DataLoader(playerRankingsBatch);

