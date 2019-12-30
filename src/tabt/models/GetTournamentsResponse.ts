/**
 * Created by florentcardoen on 22/12/17.
 */

export interface GetTournamentsResponse {
  TournamentCount: number;
  TournamentEntries: TournamentEntry[];
}

export interface Venue {
  Name: string;
  Street: string;
  Town: string;
}

export interface SerieEntry {
  UniqueIndex: number;
  Name: string;
}

export interface TournamentEntry {
  UniqueIndex: number;
  Name: string;
  ExternalIndex: string;
  DateFrom: Date;
  RegistrationDate: Date;
  Venue: Venue;
  SerieCount: number;
  SerieEntries: SerieEntry[];
}






