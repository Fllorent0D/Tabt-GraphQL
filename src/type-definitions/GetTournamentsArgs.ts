import {ArgsType, Field} from "type-graphql";

import {CredentialsType, IRequest} from "../tabt/models";

@ArgsType()
export class GetTournamentArgs implements IRequest {
  public Credentials: CredentialsType;
  public WithResults = true;

  @Field()
  public Season?: number;

  @Field()
  public TournamentUniqueIndex: number;
}

@ArgsType()
export class GetTournamentsArgs implements IRequest {
  public Credentials: CredentialsType;
  public WithResults = false;

  @Field()
  public Season?: number;
}
