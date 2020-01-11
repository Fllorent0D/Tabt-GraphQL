import {Arg, Args, Ctx, FieldResolver, Info, Query, Resolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {In, Repository} from 'typeorm';

import {Club} from '../entities/club';
import {PlayerInfo} from '../entities/player-info';
import {PlayerClub} from '../entities/playerClub';
import {GraphQLResolveInfo} from 'graphql';
import {ClubTeam} from '../entities/club-team';

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
  async members(
    @Root() club: Club,
    @Ctx() context: any,
    @Info() info: GraphQLResolveInfo
  ): Promise<PlayerInfo[]> {
    const playerClub: PlayerClub[] = await this.playerClubRepository.find({club_id: club.id, season: 17});
    const allIds = playerClub.map((pClub) => pClub.player_id);
    return context.loader.loadMany(PlayerInfo, {id: In(allIds)}, info);
    // return Promise.all(playerClub.map((playerClub) => playerClub.player));
  }

  @FieldResolver(returns => [ClubTeam])
  async teams(
    @Root() club: Club,
    @Ctx() context: any,
    @Info() info: GraphQLResolveInfo
  ): Promise<PlayerInfo[]> {
    return context.clubTeamsLoader.load(club.id);
  }

}
