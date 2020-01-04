import {FieldResolver, Resolver, Root} from 'type-graphql';
import {PlayerInfo} from '../entities/player-info';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {PlayerClub} from '../entities/playerClub';
import {Repository} from 'typeorm';
import {Club} from '../entities/club';

@Resolver(PlayerInfo)
export class PlayerInfoResolver{
  constructor(
    @OrmRepository(PlayerClub) private playerClubRepo: Repository<PlayerClub>
  ) {
  }

  @FieldResolver(returns => Club)
  async club(@Root() playerInfo: PlayerInfo): Promise<Club>{
    const playerClub = await this.playerClubRepo.findOne({player_id: playerInfo.id, season: 17})
    return playerClub.club;
  }



}