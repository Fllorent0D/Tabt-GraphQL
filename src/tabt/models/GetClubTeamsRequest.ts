import {CredentialsType} from "./CredentialsType";
import { IRequest } from "./IRequest";

export class GetClubTeamsRequest implements IRequest{
	public Credentials: CredentialsType;
	public Club: string;
	public Season: number;

}
