import {Service} from "typedi";
import {chain, camelCase} from 'lodash';
import * as randomIpv4 from 'random-ipv4';

import {
  Club,
  DivisionEntry,
  GetClubsRequest,
  GetMembersRequest,
  GetClubsResponse,
  GetClubTeamsRequest,
  GetDivisionRankingRequest,
  GetDivisionsRequest,
  GetMatchesRequest,
  GetMembersResponse,
  GetSeasonsResponse,
  GetTournamentsRequest,
  IRequest,
  TeamEntry,
  TeamMatchEntry,
  TestRequest,
  TestResponse,
  TournamentEntry,
  TournamentRegister,
  TournamentRegisterResponse
} from "./models";
import axios from 'axios';
import {MemberEntry} from "./models/MemberEntry";
import {GetMatchesArgs} from "../type-definitions/GetMatchesArgs";
import {Member} from "../type-definitions/Member";
import {RankingEntry} from "../type-definitions/RankingEntry";

@Service()
export class TabtService {
  public stub: string = 'https://resultats.aftt.be/api/?wsdl';
  private currentIp: string;

  constructor() {
    this.reloadIp();
  }

  public getSeasons(): Promise<GetSeasonsResponse> {
    return this.callUrl('/seasons');
  }

  public getClubTeams(args: GetClubTeamsRequest): Promise<TeamEntry[]> {
    return this.callUrl(`/clubs/${args.Club}/teams`, args);
  }

  public getDivisionRanking(args: GetDivisionRankingRequest): Promise<RankingEntry[]> {
    return this.callUrl(`/divisions/${args.DivisionId}/ranking`, args);
  }

  public getMatches(args: GetMatchesArgs): Promise<TeamMatchEntry[]> {
    return this.callUrl('/matchs', args);
  }

  public getMembers(args: GetMembersRequest): Promise<Member[]> {
    return this.callUrl('/membres', args);
  }

  public getMember(args: GetMembersRequest): Promise<Member> {
    return this.callUrl(`/membres/${args.UniqueIndex}`, args);
  }

  public getClubs(args: GetClubsRequest): Promise<Club[]> {
    return this.callUrl('/clubs', args);
  }

  public getClub(args: GetClubsRequest): Promise<Club> {
    return this.callUrl(`/clubs/${args.Club}`, args);
  }

  public getDivisions(args: GetDivisionsRequest): Promise<DivisionEntry[]> {
    return this.callUrl('/divisions', args);
  }

  public getTournaments(args: GetTournamentsRequest): Promise<TournamentEntry[]> {
    return this.callUrl('/tournaments', args);
  }

  public getTournament(tournamentId: string, args: GetTournamentsRequest): Promise<TournamentEntry[]> {
    return this.callUrl(`/tournaments/${tournamentId}`, args);
  }

  public testRequest(args: TestRequest): Promise<TestResponse> {
    return this.callUrl('/test', args);
  }

  private async callUrl(url: string, args?: IRequest, maxRetry: number = 5): Promise<any> {

    const queryString = chain(args)
      .toPairsIn()
      .map(([key, value]: [string, string]) => `${camelCase(encodeURIComponent(key))}=${encodeURIComponent(value)}`)
      .join('&')
      .value();

    const urlToCall = `http://localhost:5000/api${url}?${queryString}`;

    try {
      const res = await axios.get(urlToCall, {
        headers: {
          'x-frenoy-login': 'floca',
          'x-frenoy-password': 'fca-1995',
          'x-frenoy-database': 'aftt',
          'x-forwarded-for': this.currentIp
        }
      });
      if (res.status === 200) {
        return res.data;
      } else if (maxRetry > 0) {
        this.reloadIp();
        console.warn(`Changing IP to ${this.currentIp}...`);
        return this.callUrl(url, args, maxRetry - 1);
      } else {
        throw new Error('Too much errors... stopping');
      }
    } catch (err) {
      console.log(err);
      throw err
    }
  }

  private reloadIp() {
    this.currentIp = randomIpv4('{token1}.{token2}.{token3}.{token4}', {
      token1: {
        min: 127,
        max: 127
      },
      token2: {
        min: 127,
        max: 192
      },
      token3: {
        min: 0,
        max: 200
      },
      token4: {
        min: 0,
        max: 200
      }
    });
  }

}
