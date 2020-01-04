import {Arg, Args, FieldResolver, Query, Resolver, Root} from 'type-graphql';

import {Club} from '../entities/club';
import {Repository} from 'typeorm';
import {PlayerInfo} from '../entities/player-info';
import {PlayerClub} from '../entities/playerClub';
import {OrmRepository} from 'typeorm-typedi-extensions';

@Resolver(Club)
export class ClubResolver {

  constructor(
    @OrmRepository(Club) private clubRepository: Repository<Club>,
    @OrmRepository(PlayerClub) private playerClubRepository: Repository<PlayerClub>) {
  }

  @Query(() => Club)
  async club(
    @Arg('clubId') clubId: string,
    @Arg('season') season: number
  ): Promise<Club> {
    return this.clubRepository.findOne({indice: clubId});
  }

  @FieldResolver(returns => [PlayerInfo])
  async membres(
    @Root() club: Club
  ): Promise<PlayerInfo[]> {
    const playerClub = await this.playerClubRepository.find({club_id: club.id, season: 17});
    return Promise.all(playerClub.map((playerClub) => playerClub.player));
  }

  @FieldResolver()
  teams(
    @Root() club: Club,
    @Arg('clubId') clubId: string
  ): string {
    console.log(club);
    console.log(clubId);
    return "test";
  }


}
