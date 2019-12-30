import {CredentialsType} from "./CredentialsType";
import { IRequest } from "./IRequest";

export class TournamentRegister implements IRequest{
  public Credentials: CredentialsType;
  public SerieUniqueIndex: number;
  public TournamentUniqueIndex: number;
  public PlayerUniqueIndex: number;
  public Unregister: boolean;
  public NotifyPlayer: boolean;
}
