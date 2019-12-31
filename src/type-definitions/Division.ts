import {Field, ObjectType} from "type-graphql";
import {RankingEntry} from "./RankingEntry";
import {TeamMatch} from "./TeamMatch";
import {Team} from "./Team";

@ObjectType()
export class Division {
  @Field()
  DivisionId: number;

  @Field()
  DivisionName: string;

  @Field()
  DivisionCategory: number;

  @Field()
  Level: number;

  @Field()
  MatchType: number;

  @Field(returns => [RankingEntry])
  Ranking: RankingEntry[];

  @Field(returns => [TeamMatch])
  Matches: TeamMatch[];
}
