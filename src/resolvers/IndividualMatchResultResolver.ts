import {FieldResolver, Resolver, Root} from "type-graphql";
import {TabtService} from "../tabt/tabt.service";
import {IndividualMatchResult} from "../type-definitions/TeamMatch";
import {Member} from "../type-definitions/Member";
import {GetMembersRequest} from "../tabt/models";

@Resolver(IndividualMatchResult)
export class IndividualMatchResultResolver {
  constructor(private tabt: TabtService) {
  }

  @FieldResolver(returns => Member)
  async HomePlayer(@Root() individualMatchResult: IndividualMatchResult) {
    if(!individualMatchResult.HomePlayerUniqueIndex){
      return null
    }

    const request = new GetMembersRequest();
    request.UniqueIndex = individualMatchResult.HomePlayerUniqueIndex;
    return await this.tabt.getMember(request)
  }

  @FieldResolver(returns => Member)
  async AwayPlayer(@Root() individualMatchResult: IndividualMatchResult) {
    if(!individualMatchResult.AwayPlayerUniqueIndex){
      return null
    }
    const request = new GetMembersRequest();
    request.UniqueIndex = individualMatchResult.AwayPlayerUniqueIndex;
    return await this.tabt.getMember(request)
  }
}
