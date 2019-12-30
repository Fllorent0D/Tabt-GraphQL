import {Field, ObjectType} from "type-graphql";
import {RankingEntry} from "./RankingEntry";

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
  Ranking: RankingEntry[]
}
