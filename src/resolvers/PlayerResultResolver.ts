import {FieldResolver, Resolver, Root} from "type-graphql";
import {Member, PlayerResultEntryType} from "../type-definitions/Member";
import {GetClubsRequest, GetMembersRequest} from "../tabt/models";
import {TabtService} from "../tabt/tabt.service";

@Resolver(PlayerResultEntryType)
export class PlayerResultResolver{
  constructor(private tabt: TabtService) {
  }


  @FieldResolver(returns => Member)
  async Opponent(@Root() playerResultEntryType: PlayerResultEntryType) {
    const request = new GetMembersRequest();
    request.UniqueIndex = playerResultEntryType.UniqueIndex;

    return await this.tabt.getMember(request);
  }
}
