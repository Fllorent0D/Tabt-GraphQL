import {ArgsType, Field} from "type-graphql";
import {IRequest} from "../tabt/models";

@ArgsType()
export class GetMatchesArgs implements IRequest{
  public Credentials;
  public WithDetails?: boolean;
  public ShowDivisionName?: DivisionNameType;

  @Field()
  public DivisionId?: number;

  @Field()
  public Club?: string;

  @Field()
  public Team?: string;

  @Field()
  public DivisionCategory?: number;

  @Field()
  public Season?: number;

  @Field()
  public WeekName?: string;

  @Field()
  public Level?: number;

  @Field()
  public YearDateFrom?: string;

  @Field()
  public YearDateTo?: string;

  @Field()
  public MatchId?: string;

  @Field()
  public MatchUniqueId?: number;
}

export enum DivisionNameType{
  No = 'no',
  Yes = 'yes',
  Short = 'short'
}
