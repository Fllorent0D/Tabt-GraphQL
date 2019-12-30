import {TeamMatchDetailsEntry} from "./TeamMatchDetailsEntry";

export class TeamMatchEntry{
	public DivisionName: string;
	public MatchId: string;
	public WeekName: number;
	public Date: string;
	public Time: string;
	public Venue: number;
	public HomeClub: string;
	public HomeTeam: string;
	public AwayClub: string;
	public AwayTeam: string;
	public Score: string;
	public MatchUniqueId: string;
	public NextWeekName: number;
	public PreviousWeekName: number;
	public IsHomeForfeited: boolean;
	public IsAwayForfeited: boolean;
	public DivisionCategory: number;
	public DivisionId: number;
	public MatchDetails: TeamMatchDetailsEntry;
}
