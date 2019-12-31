import {TabtService} from "../tabt/tabt.service";
import {FieldResolver, Resolver, Root} from "type-graphql";
import {Member} from "../type-definitions/Member";
import {TeamMatchPlayer} from "../type-definitions/TeamMatch";
import {GetMembersRequest} from "../tabt/models";

@Resolver(TeamMatchPlayer)
export class TeamMatchPlayerResolver{
  constructor(private tabt: TabtService) {
  }

  @FieldResolver(returns => Member)
  async Player(@Root() teamMatchPlayer: TeamMatchPlayer){
    const request = new GetMembersRequest();
    request.WithResults = true;
    request.UniqueIndex = teamMatchPlayer.UniqueIndex;
    return await this.tabt.getMember(request);

  }

}
