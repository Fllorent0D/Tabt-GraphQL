import {Field, ObjectType} from "type-graphql";
import {Club} from "./Club";
import {Division} from "./Division";

@ObjectType()
export class TeamMatch {
  public DivisionName: string;
  public DivisionCategory: number;
  public DivisionId: number;
  public HomeClub: string;
  public AwayClub: string;

  @Field(type => Division)
  public Division: Division;

  @Field()
  public MatchId: string;

  @Field()
  public WeekName: number;

  @Field()
  public Date: string;

  @Field()
  public Time: string;

  @Field()
  public Venue: number;

  @Field()
  public HomeTeam: string;

  @Field()
  public AwayTeam: string;

  @Field(type => Club, {name: 'AwayClub'})
  public AwayClubEntry: Club;

  @Field(type => Club, {name: 'HomeClub'})
  public HomeClubEntry: Club;

  @Field()
  public Score: string;

  @Field()
  public MatchUniqueId: string;

  @Field()
  public NextWeekName: number;

  @Field()
  public PreviousWeekName: number;

  @Field()
  public IsHomeForfeited: boolean;

  @Field()
  public IsAwayForfeited: boolean;


  public MatchDetails: any;
}
