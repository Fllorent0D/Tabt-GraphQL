import {CredentialsType} from "./CredentialsType";
import { IRequest } from "./IRequest";

export enum RankingSystem {
	Classic = 1,
	Overloop = 2,
	FourWin = 3,
	IndividualVictory = 4,
	Sporcrea = 5,
	Classic2009 = 6
}

export class GetDivisionRankingRequest implements IRequest{
	public Credentials: CredentialsType;
	public DivisionId: number;
	public RankingSystem: RankingSystem;
	public WeekName: string;

}
