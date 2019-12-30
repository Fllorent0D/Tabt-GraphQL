import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Member, PlayerResultEntryType} from "../type-definitions/Member";
import {TabtService} from "../tabt/tabt.service";
import {Club, GetClubsRequest, GetMembersRequest} from "../tabt/models";

@Resolver(Member)
export class MemberResolver {
  constructor(private tabt: TabtService) {
  }

  @Query(returns => [Member], {nullable: true})
  async user(@Arg("uniqueIndex", {nullable: true}) uniqueIndex: number,
             @Arg("club", {nullable: true}) club: string,
             @Arg("season", {nullable: true}) season: number,
             @Arg("playerCategory", {nullable: true}) playerCategory: number,
             @Arg("nameSearch", {nullable: true}) nameSearch: string) {

    const request = new GetMembersRequest();

    if (uniqueIndex) {
      request.UniqueIndex = uniqueIndex;
    }
    if (club) {
      request.Club = club;
    }
    if (season) {
      request.Season = season;
    }
    if (playerCategory) {
      request.PlayerCategory = playerCategory;
    }
    if (nameSearch) {
      request.NameSearch = nameSearch;
    }
    request.WithResults = true;

    const members: Member[] = await this.tabt.getMembers(request);

    if (club) {
      members.map((member) => member.Club = club);
    }
    return members
  }

  @FieldResolver(returns => Club)
  async ClubEntry(@Root() member: Member) {
    const request = new GetClubsRequest();
    request.Club = member.Club;

    return await this.tabt.getClub(request);
  }

}
