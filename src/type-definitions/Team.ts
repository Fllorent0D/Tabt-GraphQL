import {Field, ObjectType} from "type-graphql";
import {RankingEntry} from "./RankingEntry";
import {Division} from "./Division";
import {TeamMatch} from "./TeamMatch";

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

  @Field(returns => [TeamMatch])
  Matches: TeamMatch[];

  public DivisionId: number;
  public DivisionName: string;
  public DivisionCategory: number;
  public MatchType: number;
  public ClubIndex: string;
}
