import {CredentialsType} from "./CredentialsType";
import { IRequest } from "./IRequest";

export class GetMatchesRequest implements IRequest{
	public Credentials: CredentialsType;
	public DivisionId: number;
	public Club: string;
	public Team: string;
	public DivisionCategory: number;
	public Season: number;
	public WeekName: string;
	public Level: number;
	public ShowDivisionName: DivisionNameType;
	public YearDateFrom: string;
	public YearDateTo: string;
	public WithDetails: boolean;
	public MatchId: string;
	public MatchUniqueId: number;
}

export enum DivisionNameType{
	No = 'no',
	Yes = 'yes',
	Short = 'short'
}
