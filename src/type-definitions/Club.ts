import {Venue} from "./Venue";
import {Field, ObjectType} from "type-graphql";
import {Member} from "./Member";
import {Team} from "./Team";
import {TeamMatch} from "./TeamMatch";

/**
 * Created by florentcardoen on 22/12/17.
 */
@ObjectType()
export class Club {
  @Field()
  public Category: number;

  @Field()
  public CategoryName: string;

  @Field()
  public LongName: string;

  @Field()
  public Name: string;

  @Field()
  public UniqueIndex: string;

  @Field()
  public VenueCount: number;

  @Field(returns => [Venue])
  public VenueEntries: Venue[];

  @Field(returns => [Member])
  public Members: Member[];

  @Field(returns => [Team])
  public Teams: Team[];

  @Field(returns => [TeamMatch])
  Matches: TeamMatch[];
}
