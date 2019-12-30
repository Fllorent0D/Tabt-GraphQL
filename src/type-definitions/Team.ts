import {Field, ObjectType} from "type-graphql";
import {RankingEntry} from "./RankingEntry";
import {Division} from "./Division";

@ObjectType()
export class Team{
  @Field()
  public TeamId: string;
  @Field()
  public Team: string;
  @Field(type => [RankingEntry])
  public Ranking: RankingEntry[];
  @Field(type => Division)
  public Division: Division;


  public DivisionId: number;
  public DivisionName: string;
  public DivisionCategory: number;
  public MatchType: number;

}
