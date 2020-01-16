import {getRepository, In, Repository} from 'typeorm';
import DataLoader = require('dataloader');

import {Club} from '../entities/club';
import {ClubCategory} from '../entities/club-category';
import {Venue} from '../entities/venue';
import {Level} from '../entities/level';
import {ClubTeam} from '../entities/club-team';
import {Division} from '../entities/division';

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
export const clubLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(Club), 'club_id'));
export const clubCategoryLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(ClubCategory), 'id'));
export const clubVenueLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(Venue), 'clubId'));

// Level
export const levelLoader = () => new DataLoader(loadOneForKeyBatchFunction(getRepository(Level), 'id'));

//Teams
export const divisionTeamsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(ClubTeam), 'div_id'));
export const clubTeamsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(ClubTeam), 'club_id'));

//Divisions
export const levelDivisionsLoader = () => new DataLoader(loadManyForKeyBatchFunction(getRepository(Division), 'level_id'));
