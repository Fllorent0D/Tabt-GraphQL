import {FieldResolver, Resolver, Root} from "type-graphql";
import {TabtService} from "../tabt/tabt.service";
import {Division} from "../type-definitions/Division";
import {Club, GetDivisionRankingRequest, GetDivisionsRequest, GetMatchesRequest} from "../tabt/models";
import {RankingEntry} from "../type-definitions/RankingEntry";
import {Team} from "../type-definitions/Team";
import {TeamMatch} from "../type-definitions/TeamMatch";

@Resolver(Team)
export class TeamResolver {
  constructor(private tabt: TabtService) {
  }

  @FieldResolver(returns => Division)
  async Division(@Root() team: Team) {
    const request = new GetDivisionsRequest();
    const divisions = await this.tabt.getDivisions(request);
    return divisions.find((division) => division.DivisionId === team.DivisionId)
  }

  @FieldResolver(returns => [RankingEntry])
  async Ranking(@Root() team: Team) {
    const request = new GetDivisionRankingRequest();
    request.DivisionId = team.DivisionId;
    return await this.tabt.getDivisionRanking(request)
  }

  @FieldResolver(returns => [TeamMatch])
  async Matches(@Root() team: Team) {
    const request = new GetMatchesRequest();
    request.DivisionId = team.DivisionId;
    request.Club = team.ClubIndex;
    request.Team = team.Team;
    return await this.tabt.getMatches(request);
  }

}
