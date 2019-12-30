import {CredentialsType} from "./CredentialsType";
import { IRequest } from "./IRequest";

export class GetDivisionsRequest implements IRequest{
	public Credentials: CredentialsType;
	public Season: number;
	public Level: number;
	public ShowDivisionName: string;
}
