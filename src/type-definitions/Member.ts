/**
 * Created by florentcardoen on 24/12/17.
 */
import {Field, Int, ObjectType} from "type-graphql";
import {Club} from "./Club";


@ObjectType()
export class Member {

    @Field()
    public Position: number;

    @Field(type => Int)
    public UniqueIndex: number;

    @Field()
    public RankingIndex: number;

    @Field({nullable: false})
    public FirstName: string;

    @Field({nullable: false})
    public LastName: string;

    @Field()
    public Ranking: string;

    @Field()
    public Status: string;

    @Field()
    public Club: string;

    @Field(returns => Club)
    public ClubEntry: Club;


    @Field()
    public Gender: string;

    @Field()
    public Category: string;

    @Field()
    public BirthDate: string;

    @Field()
    public MedicalAttestation: boolean;

    @Field()
    public RankingPointsCount: number;


  /*  @Field()
    public RankingPointsEntries: {
        MethodName: string;
        Value: string;
        LastModified: Date
    };
*/
    @Field()
    public Email: string;

    @Field()
    public Phone: string;

    @Field()
    public Address: string;

    @Field()
    public ResultCount: string;

    @Field(returns => [PlayerResultEntryType])
    public ResultEntries: PlayerResultEntryType[];
}

@ObjectType()
export class PlayerResultEntryType {
  @Field()
  SetFor: number;
  @Field()
  SetAgainst: number;
  @Field()
  CompetitionType: string;
  @Field()
  Club: string;
  @Field()
  MatchId: string;
  @Field()
  Result: string;
  @Field()
  Date: Date;
  @Field()
  Opponent: Member;

  UniqueIndex: number;
  FirstName: string;
  LastName: string;
  Ranking: string;
}
