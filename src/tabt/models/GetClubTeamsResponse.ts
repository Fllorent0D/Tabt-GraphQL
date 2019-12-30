import {TeamEntry} from "./TeamEntry";

export class GetClubTeamsResponse{
	public ClubName: string;
	public TeamCount: number;
	public TeamEntries: TeamEntry[];
}
