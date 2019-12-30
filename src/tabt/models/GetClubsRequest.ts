import {CredentialsType} from "./CredentialsType";
import { IRequest } from "./IRequest";

/**
 * Created by florentcardoen on 22/12/17.
 */
export class GetClubsRequest implements IRequest{
  public Credentials: CredentialsType;
  public Club: string;
  public ClubCategory: number;
  public Season: number;

}
