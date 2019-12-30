import {Field, ObjectType} from "type-graphql";
import {Club} from "./Club";

@ObjectType()
export class RankingEntry {

  @Field()
  public Position: number;

  @Field()
  public Team: string;

  @Field()
  public GamesPlayed: number;

  @Field()
  public GamesWon: number;

  @Field()
  public GamesLost: number;

  @Field()
  public GamesDraw: number;

  @Field()
  public IndividualMatchesWon: number;

  @Field()
  public IndividualMatchesLost: number;

  @Field()
  public IndividualSetsWon: number;

  @Field()
  public IndividualSetsLost: number;

  @Field()
  public Points: number;

  public TeamClub: string;

  @Field(returns => Club)
  public Club: Club;
}
