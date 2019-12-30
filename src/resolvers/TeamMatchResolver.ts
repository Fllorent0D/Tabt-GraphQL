import {Args, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {TeamMatch} from "../type-definitions/TeamMatch";
import {TabtService} from "../tabt/tabt.service";
import {DivisionNameType, GetMatchesArgs} from "../type-definitions/GetMatchesArgs";
import {Club} from "../type-definitions/Club";
import {Division} from "../type-definitions/Division";
import {GetClubsRequest, GetDivisionsRequest} from "../tabt/models";

@Resolver(TeamMatch)
export class TeamMatchResolver {
  constructor(private tabt: TabtService) {
  }

  @Query(returns => [TeamMatch])
  async getMatches(@Args() test: GetMatchesArgs) {

    test.WithDetails = true;
    test.ShowDivisionName = DivisionNameType.Yes;
    const matches = await this.tabt.getMatches(test);

    matches.map((match) => match.DivisionId = Number(match.DivisionId));

    return matches;
  }

  @FieldResolver(returns => Club)
  async HomeClubEntry(@Root() teamMatch: TeamMatch) {
    const request = new GetClubsRequest();
    request.Club = teamMatch.HomeClub;
    return await this.tabt.getClub(request)

  }

  @FieldResolver(returns => Club)
  async AwayClubEntry(@Root() teamMatch: TeamMatch) {
    const request = new GetClubsRequest;
    request.Club = teamMatch.AwayClub;
    return await this.tabt.getClub(request)
  }

  @FieldResolver(returns => Division)
  async Division(@Root() teamMatch: TeamMatch) {
    const request = new GetDivisionsRequest();
    const divisions = await this.tabt.getDivisions(request);
    return divisions.find((division) => division.DivisionId === teamMatch.DivisionId)
  }


}
