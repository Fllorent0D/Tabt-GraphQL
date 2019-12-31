import {FieldResolver, Resolver, Root} from "type-graphql";
import {TabtService} from "../tabt/tabt.service";
import {IndividualMatchResult} from "../type-definitions/TeamMatch";
import {Member} from "../type-definitions/Member";
import {GetMembersRequest} from "../tabt/models";

@Resolver(IndividualMatchResult)
export class IndividualMatchResultResolver {
  constructor(private tabt: TabtService) {
  }

}
