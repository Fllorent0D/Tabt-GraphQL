import {Field, ObjectType} from "type-graphql";
import {Club} from "./Club";
import {Division} from "./Division";
import {Member} from "./Member";
import {Venue} from "./Venue";

@ObjectType()
export class TeamMatchDoubleTeam {

  @Field()
  public Position: number;

  @Field()
  public Team: number;

  @Field()
  public IsForfeited: boolean;
}

@ObjectType()
export class TeamMatchPlayer{
  public UniqueIndex: number;
  public FirstName: string;
  public LastName: string;
  public Ranking: string;

  @Field(returns => Member)
  public Player: Member;

  @Field()
  public Position: number;

  @Field()
  public VictoryCount: number;

  @Field()
  public IsForfeited: boolean;
}

@ObjectType()
export class IndividualMatchResult{

  @Field()
  public Position: number;

  @Field()
  public HomePlayerMatchIndex: number;

  @Field()
  public AwayPlayerMatchIndex: number;

  @Field(returns => Member)
  public HomePlayer: Member;

  @Field(returns => Member)
  public AwayPlayer: Member;

  public HomePlayerUniqueIndex: number;
  public AwayPlayerUniqueIndex: number;

  @Field()
  public HomeSetCount: number;

  @Field()
  public AwaySetCount: number;

  @Field()
  public IsHomeForfeited: boolean;

  @Field()
  public IsAwayForfeited: boolean;

  @Field()
  public Scores: string;
}


@ObjectType()
export class TeamMatchPlayerList{

  @Field()
  public PlayerCount: number;

  @Field()
  public DoubleTeamCount: number;

  @Field(returns => TeamMatchPlayer)
  public Players: TeamMatchPlayer[];

  @Field(returns => [TeamMatchDoubleTeam])
  public DoubleTeams: TeamMatchDoubleTeam[];
}


@ObjectType()
export class TeamMatchDetails{
  @Field()
  public DetailsCreated: boolean;

  @Field()
  public StartTime: string;

  @Field()
  public EndTime: string;

  @Field()
  public HomeCaptain: number;

  @Field()
  public AwayCaptain: number;

  @Field()
  public Referee: number;

  @Field()
  public HallCommissioner: number;

  @Field(returns => TeamMatchPlayerList)
  public HomePlayers: TeamMatchPlayerList;

  @Field(returns => TeamMatchPlayerList)
  public AwayPlayers: TeamMatchPlayerList;

  @Field(returns => [IndividualMatchResult])
  public IndividualMatchResults: IndividualMatchResult[];

  @Field()
  public MatchSystem: number;

  @Field()
  public HomeScore: number;

  @Field()
  public AwayScore: number;

}

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

  @Field(returns => TeamMatchDetails)
  public MatchDetails: TeamMatchDetails;

  @Field()
  public IsHomeWithdrawn: string;

  @Field()
  public IsAwayWithdrawn: string;

  @Field()
  public VenueClub: string;

  @Field(returns => Club, {name: "VenueClub"})
  public VenueClubEntry: Club;

  @Field()
  public IsValidated: boolean;

  @Field()
  public IsLocked: boolean;
}

