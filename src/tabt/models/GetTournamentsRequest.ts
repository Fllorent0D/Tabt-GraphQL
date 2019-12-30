import {CredentialsType} from "./CredentialsType";
import { IRequest } from "./IRequest";

export class GetTournamentsRequest implements IRequest{
  public Credentials: CredentialsType;
  public Season: number;
  public TournamentUniqueIndex: number;
  public WithResults: boolean;
}
