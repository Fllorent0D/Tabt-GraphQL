import {TeamMatchPlayerEntry} from "./TeamMatchPlayerEntry";
import {TeamMatchDoubleTeamEntry} from "./TeamMatchDoubleTeamEntry";

export class TeamMatchPlayerList{
	public PlayerCount: number;
	public DoubleTeamCount: number;
	public Players: TeamMatchPlayerEntry[];
	public DoubleTeams: TeamMatchDoubleTeamEntry[];
}
