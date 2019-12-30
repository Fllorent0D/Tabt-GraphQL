import {FieldResolver, Resolver, Root} from "type-graphql";
import {TabtService} from "../tabt/tabt.service";
import {Division} from "../type-definitions/Division";
import {GetDivisionRankingRequest, GetDivisionsRequest} from "../tabt/models";
import {RankingEntry} from "../type-definitions/RankingEntry";
import {Team} from "../type-definitions/Team";

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
}
