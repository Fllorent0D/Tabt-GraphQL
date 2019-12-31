import {Field, ObjectType} from "type-graphql";
import {Venue} from "./Venue";
import {IndividualMatchResult} from "./TeamMatch";

@ObjectType()
export class TournamentSerie {

  @Field()
  UniqueIndex: number;

  @Field()
  Name: string;

  ResultCount: number;

  @Field(type => [IndividualMatchResult], {name: 'Results'})
  ResultEntries: IndividualMatchResult[];
}

@ObjectType()
export class Tournament {
  @Field()
  UniqueIndex: number;

  @Field()
  Name: string;

  @Field()
  ExternalIndex: string;

  @Field()
  DateFrom: Date;

  @Field()
  RegistrationDate: Date;

  @Field(type => Venue)
  Venue: Venue;

  @Field(type => [TournamentSerie], {name: 'Series'})
  SerieEntries: TournamentSerie[];

  SerieCount: number;

}
