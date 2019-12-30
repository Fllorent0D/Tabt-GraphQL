import {FieldResolver, Resolver, Root} from "type-graphql";
import {TabtService} from "../tabt/tabt.service";
import {Division} from "../type-definitions/Division";
import {GetClubsRequest, GetDivisionRankingRequest} from "../tabt/models";
import {RankingEntry} from "../type-definitions/RankingEntry";
import {Club} from "../type-definitions/Club";

@Resolver(RankingEntry)
export class RankingEntryResolver {
  constructor(private tabt: TabtService) {
  }

  @FieldResolver(returns => Club)
  async Club(@Root() rankingEntry: RankingEntry) {
    const request = new GetClubsRequest();
    request.Club = rankingEntry.TeamClub;
    return await this.tabt.getClub(request)
  }
}
