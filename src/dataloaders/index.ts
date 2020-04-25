import {FindOperator, getRepository, In, Repository} from 'typeorm';
import DataLoader from 'dataloader';

import {Club} from '../entities/club';
import {ClubCategory} from '../entities/club-category';
import {Venue} from '../entities/venue';
import {Level} from '../entities/level';
import {ClubTeam} from '../entities/club-team';
import {Division} from '../entities/division';
import {MatchResult} from '../entities/matchResult';
import {MatchInfo} from '../entities/matchInfo';
import {PlayerInfo} from '../entities/player-info';
import {MatchSet} from '../entities/matchSet';
import {MatchSystemPlayer} from '../entities/matchSystemPlayer';
import {PlayerLastELO} from '../entities/playerLastELO';
import {CalendarTypeInfo} from '../entities/calendarTypeInfo';
import {calendarweekname} from '../../dist/entities/calendarweekname';
import {PlayerStatus} from '../entities/playerStatus';
import {DivisionCategory} from '../entities/division-category';
import {PlayerELOHistory} from '../entities/playerELOHistory';

export const loadManyForKeyBatchFunction = <T>(repository: Repository<T>, key: string): (ids: number[]) => Promise<T[][]> => async (ids) => {
	const entities = await repository
		.createQueryBuilder()
		.where({[key]: In(ids)})
		.getMany();

	return ids.map((entityId) => entities.filter((entity) => entity[key] === entityId));
};

export const loadOneForKeyBatchFunction = <T>(repository: Repository<T>, key: string): (ids: number[]) => Promise<T[]> => async (ids) => {
	const entities = await repository
		.createQueryBuilder()
		.where({[key]: In(ids)})
		.getMany();

	return ids.map((entityId) => entities.find((entity) => entity[key] === entityId));
};


// Club
export const clubLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(Club), 'id'));
export const clubCategoryLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(ClubCategory), 'id'));
export const clubVenuesLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(Venue), 'clubId'));
// export const clubMembersLoader = () => new DataLoader();
// Level
export const levelLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(Level), 'id'));

//Teams
export const divisionTeamsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(ClubTeam), 'div_id'));
export const clubTeamsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(ClubTeam), 'club_id'));

//Divisions
export const levelDivisionsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(Division), 'level_id'));
export const divisionsLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(Division), 'id'));
export const categoryDivisionsLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(DivisionCategory), 'id'));

//MatchResult
export const matchResultsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(MatchResult), 'match_id'));
export const divisionMatchResultsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(MatchResult), 'div_id'));
export const matchInfoLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(MatchInfo), 'id'));
export const matchSetsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(MatchSet), 'match_id'));
export const matchSystemPlayerLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(MatchSystemPlayer), 'match_type_id'));

// Player
export const memberLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(PlayerInfo), 'id'));
export const playerELOLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(PlayerLastELO), 'player_id'));
export const playerELOHistoryLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(PlayerELOHistory), 'player_id'));

// Calendar
export const calendarTypeLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(CalendarTypeInfo), 'id'))
export const calendarWeekNameLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(calendarweekname), 'id'))

//Player status
export const playerStatusLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(PlayerStatus), 'player_id'))

