// Homemade Dataloader let's go!

import {getRepository, In} from 'typeorm';
import {ClubTeam} from '../entities/club-team';
import DataLoader = require('dataloader');
import {Club} from '../entities/club';

export const batchTeamClub = async (club_ids: number[]): Promise<Club[]> => {
  const club = await getRepository(Club)
    .createQueryBuilder('club')
    .where({club_id: In(club_ids)})
    .getMany();

  return club_ids.map((id) => club.find((club) => club.id === id));
};

export const teamClubLoader = () => new DataLoader(batchTeamClub);

