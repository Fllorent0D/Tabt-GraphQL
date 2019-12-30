import {FieldResolver, Resolver, Root} from "type-graphql";
import {TabtService} from "../tabt/tabt.service";
import {Division} from "../type-definitions/Division";
import {GetDivisionRankingRequest} from "../tabt/models";
import {RankingEntry} from "../type-definitions/RankingEntry";

@Resolver(Division)
export class DivisionResolver {
  constructor(private tabt: TabtService) {
  }

  @FieldResolver(returns => [RankingEntry])
  async Ranking(@Root() division: Division) {
    const request = new GetDivisionRankingRequest();
    request.DivisionId = division.DivisionId;
    return await this.tabt.getDivisionRanking(request)
  }
}
