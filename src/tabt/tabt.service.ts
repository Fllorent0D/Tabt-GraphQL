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
import {TeamMatch} from "../type-definitions/TeamMatch";
import {Team} from "../type-definitions/Team";
import {GetTournamentArgs, GetTournamentsArgs} from "../type-definitions/GetTournamentsArgs";
import {Tournament, TournamentSerie} from "../type-definitions/Tournament";

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

  public async getClubTeams(args: GetClubTeamsRequest): Promise<Team[]> {
    const teams: Team[] = await this.callUrl(`/clubs/${args.Club}/teams`, args);
    teams.map(team => team.ClubIndex = args.Club);
    return teams;
  }

  public getDivisionRanking(args: GetDivisionRankingRequest): Promise<RankingEntry[]> {
    return this.callUrl(`/divisions/${args.DivisionId}/ranking`, args);
  }

  public async getMatches(args: GetMatchesArgs): Promise<TeamMatch[]> {
    const matches = await this.callUrl('/matchs', args);
    matches.map((match) => {
      match.DivisionId = Number(match.DivisionId);
      match.IsLocked = Boolean(match.IsLocked);
      match.IsValidated = Boolean(match.IsValidated);
      return match;
    });
    return matches
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

  public getTournaments(args: GetTournamentsArgs): Promise<Tournament[]> {
    return this.callUrl('/tournaments', args);
  }

  public getTournament(args: GetTournamentArgs): Promise<Tournament> {
    return this.callUrl(`/tournaments/${args.TournamentUniqueIndex}`, args);
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
