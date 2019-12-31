import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Club} from "../type-definitions/Club";
import {TabtService} from "../tabt/tabt.service";
import {GetClubsRequest, GetClubTeamsRequest, GetMatchesRequest, GetMembersRequest} from "../tabt/models";
import {Member} from "../type-definitions/Member";
import {Team} from "../type-definitions/Team";
import {TeamMatch} from "../type-definitions/TeamMatch";

@Resolver(Club)
export class ClubResolver {
  constructor(private tabtService: TabtService) {
  }

  @Query(returns => Club)
  async club(
    @Arg("club", {nullable: false}) club: string,
    @Arg("season") season: number,
    @Arg("clubCategory") clubCategory: number,
    @Ctx() context: any
  ): Promise<Club> {
    const request = new GetClubsRequest();

    if (club) request.Club = club;
    if (clubCategory) request.ClubCategory = clubCategory;
    if (season) request.Season = season;

    const response = await this.tabtService.getClub(request);
    response.UniqueIndex = club;

    return response
  }

  @Query(returns => [Club])
  async clubs(
    @Arg("season") season: number,
    @Arg("clubCategory") clubCategory: number,
    @Ctx() context: any
  ): Promise<Club[]> {
    const request = new GetClubsRequest();

    if (clubCategory) request.ClubCategory = clubCategory;
    if (season) request.Season = season;
    return await this.tabtService.getClubs(request);
  }

  @FieldResolver(returns => [Member])
  async Members(@Root() club: Club) {
    const request = new GetMembersRequest();

    request.Club = club.UniqueIndex;
    request.WithResults = true;
    const response = await this.tabtService.getMembers(request);

    return response || [];
  }

  @FieldResolver(returns => [Team])
  async Teams(@Root() club: Club) {
    const request = new GetClubTeamsRequest();
    request.Club = club.UniqueIndex;
    return await this.tabtService.getClubTeams(request);
  }

  @FieldResolver(returns => [TeamMatch])
  async Matches(@Root() club: Club) {
    const request = new GetMatchesRequest();
    request.Club = club.UniqueIndex;
    return await this.tabtService.getMatches(request);
  }
}
