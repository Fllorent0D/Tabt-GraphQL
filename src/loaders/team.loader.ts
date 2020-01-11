// Homemade Dataloader let's go!

import {getRepository, In} from 'typeorm';
import {ClubTeam} from '../entities/club-team';
import DataLoader = require('dataloader');
import {groupBy, property} from 'lodash';

export const batchDivisionTeams = async (divisionIds: number[]): Promise<ClubTeam[][]> => {
  const clubTeams = await getRepository(ClubTeam)
    .createQueryBuilder('clubTeams')
    .where({div_id: In(divisionIds)})
    .getMany();

  return divisionIds.map((divisionId) => clubTeams.filter((teams) => teams.div_id === divisionId));
};

export const batchClubTeams = async (club_ids: number[]): Promise<ClubTeam[][]> => {
  const clubTeams = await getRepository(ClubTeam)
    .createQueryBuilder('clubTeams')
    .where({club_id: In(club_ids)})
    .getMany();

  return club_ids.map((id) => clubTeams.filter((teams) => teams.club_id === id));
};

export const divisionTeamsLoader = () => new DataLoader(batchDivisionTeams);
export const clubTeamsLoader = () => new DataLoader(batchClubTeams);



