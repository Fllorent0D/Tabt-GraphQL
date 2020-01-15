import {getRepository, In, Repository} from 'typeorm';
import DataLoader = require('dataloader');

import {Club} from '../entities/club';
import {ClubCategory} from '../entities/club-category';
import {Venue} from '../entities/venue';
import {Level} from '../entities/level';
import {ClubTeam} from '../entities/club-team';

export const oneToManyBatchFunction = <T>(repository: Repository<T>, key: string): (ids: number[]) => Promise<T[][]> => async (ids) => {
  const entities = await repository
    .createQueryBuilder()
    .where({[key]: In(ids)})
    .getMany();

  return ids.map((entityId) => entities.filter((entity) => entity[key] === entityId));
};

export const manyToOneBatchFunction = <T>(repository: Repository<T>, key: string): (ids: number[]) => Promise<T[]> => async (ids) => {
  const entities = await repository
    .createQueryBuilder()
    .where({[key]: In(ids)})
    .getMany();

  return ids.map((entityId) => entities.find((entity) => entity[key] === entityId));
};


// Club
export const clubLoader = () => new DataLoader(oneToManyBatchFunction(getRepository(Club), 'club_id'));
export const clubCategoryLoader = () => new DataLoader(manyToOneBatchFunction(getRepository(ClubCategory), 'id'));
export const clubVenueLoader = () => new DataLoader(oneToManyBatchFunction(getRepository(Venue), 'clubId'));

// Level
export const levelLoader = () => new DataLoader(manyToOneBatchFunction(getRepository(Level), 'id'));

//Teams
export const divisionTeamsLoader = () => new DataLoader(oneToManyBatchFunction(getRepository(ClubTeam), 'div_id'));
export const clubTeamsLoader = () => new DataLoader(oneToManyBatchFunction(getRepository(ClubTeam), 'club_id'));
