import {CalendarDates} from '../entities/calendarDates';
import {getRepository, In} from 'typeorm';
import DataLoader from 'dataloader';
import {MatchInfo} from '../entities/matchInfo';
import {Club} from '../entities/club';
import {PlayerClub} from '../entities/playerClub';
import {CURRENT_SEASON} from '../index';
import {MatchResult} from '../entities/matchResult';

const clubTeamMatchesBatch = async (ids: string[]): Promise<MatchResult[][]> => {
	const whereConditions = ids.reduce((acc, id) => {
		const [club, indice] = id.split('#');
		acc.push({
			'home_club': club,
			'home_indice': indice
		}, {
			'away_club': club,
			'away_indice': indice
		});
		return acc;
	}, []);

	const entities = await getRepository(MatchInfo)
		.createQueryBuilder('mi')
		.leftJoinAndMapOne(
			'mi.match',
			MatchResult,
			'mr',
			'mi.id = mr.match_id')
		.where(whereConditions)
		.getMany();


	return ids.map((entityId) => {
		const [club, indice] = entityId.split('#');
		return entities
			.filter((entity) =>
				(entity.home_club === Number(club) && entity.home_indice === indice) ||
				(entity.away_club === Number(club) && entity.away_indice === indice)
			)
			.map((matchInfo) => matchInfo.match);
	});
};

export const clubTeamMatchesLoader = () => new DataLoader(clubTeamMatchesBatch);
