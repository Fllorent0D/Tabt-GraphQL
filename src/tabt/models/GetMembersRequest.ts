import {CredentialsType} from "./CredentialsType";
import { IRequest } from "./IRequest";

export class GetMembersRequest implements IRequest{
	public Credentials: CredentialsType;
	public Club: string;
	public Season: number;
	public PlayerCategory: number;
	public UniqueIndex: number;
	public NameSearch: string;
	public ExtendedInformation: boolean;
	public WithResults: boolean;
	public RankingPointsInformation: boolean;
}
