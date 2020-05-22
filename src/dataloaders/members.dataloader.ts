import DataLoader from 'dataloader';
import {PlayerInfo} from '../entities/PlayerInfo';
import {PlayerClub} from '../entities/PlayerClub';
import {getRepository, In} from 'typeorm';
import {MatchPlayer} from '../entities/MatchPlayer';
import {PlayerClassement} from '../entities/PlayerClassement';
import {PlayerCategory} from '../entities/PlayerCategory';
import {ClassementInfo} from '../entities/ClassementInfo';
import {SeasonInfo} from '../entities/SeasonInfo';
import {PlayerStatus} from '../entities/PlayerStatus';


export const getMembersClubBatch = async (clubsIds: number[], season: SeasonInfo) => {
	const players = await getRepository(PlayerInfo)
		.createQueryBuilder('player_info')
		.leftJoinAndMapOne(
			'player_info.player_club',
			PlayerClub,
			'pc',
			`player_info.id = pc.player_id`)
		.andWhere('pc.season = :season AND pc.club_id IN(:clubIds)', {season: season.id, clubIds: clubsIds})
		.getMany();

	return clubsIds.map((clubId) => players.filter((player) => player.player_club?.club_id === clubId));
};
export const membersClubDataloader = (season) => new DataLoader<number, PlayerInfo[]>((ids: number[]) => getMembersClubBatch(ids, season));


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

export const playerRankingsBatch = async (playerIds: number[], season: SeasonInfo): Promise<PlayerClassement[][]> => {
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
		.andWhere('player_id IN(:playerIds) AND season = :season', {playerIds, season: season.id})
		.getMany();

	return playerIds.map((id: number) => players.filter(pm => pm.player_id === id));
};
export const playerRankingsDataloader = (season) => new DataLoader<number, PlayerClassement[]>((ids: number[]) => playerRankingsBatch(ids, season));


export const playerStatusBatch = async (playerIds: number[], season: SeasonInfo): Promise<PlayerStatus[]> => {
	const players = await getRepository(PlayerStatus)
		.createQueryBuilder('ps')
		.where({
			'season': season.id,
			'player_id': In(playerIds)
		})
		.getMany();

	return playerIds.map((id: number) => players.find(pm => pm.player_id === id));
};
export const playerStatusLoader = (season) => new DataLoader<number, PlayerStatus>((ids: number[]) => playerStatusBatch(ids, season));

