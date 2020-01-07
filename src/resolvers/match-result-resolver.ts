import {MatchResult} from '../entities/matchResult';
import {FieldResolver, Resolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {ClubTeam} from '../entities/club-team';

@Resolver(MatchResult)
export class MatchResultResolver {
  constructor(
    @OrmRepository(MatchResult) private matchResultRepo: Repository<MatchResult>,
    @OrmRepository(ClubTeam) private clubTeamRepo: Repository<ClubTeam>
  ) {
  }

  @FieldResolver(() => ClubTeam, {nullable: true})
  async awayTeam(@Root() matchResult: MatchResult): Promise<ClubTeam | null> {
    const matchInfo = await matchResult.matchInfo;
    if(!matchInfo.away_club || !matchInfo.away_indice){
      return null;
    }

    return this.clubTeamRepo.findOne({
      indice: matchInfo.away_indice,
      club_id: matchInfo.away_club
    });
  }

  @FieldResolver(() => ClubTeam, {nullable: true})
  async homeTeam(@Root() matchResult: MatchResult): Promise<ClubTeam | null> {
    const matchInfo = await matchResult.matchInfo;
    if(!matchInfo.home_club || !matchInfo.home_indice){
      return null;
    }

    return this.clubTeamRepo.findOne({
      indice: matchInfo.home_indice,
      club_id: matchInfo.home_club
    });
  }



}
