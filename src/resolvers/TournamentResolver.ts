import {Args, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {get} from 'lodash';

import {Tournament, TournamentSerie} from "../type-definitions/Tournament";
import {GetTournamentArgs, GetTournamentsArgs} from "../type-definitions/GetTournamentsArgs";
import {TabtService} from "../tabt/tabt.service";

@Resolver(Tournament)
export class TournamentResolver {

  constructor(
    private tabtService: TabtService
  ) {
  }

  @Query(returns => [Tournament])
  getTournaments(@Args() args: GetTournamentsArgs) {
    return this.tabtService.getTournaments(args);
  }

  @Query(returns => Tournament)
  getTournament(@Args() args: GetTournamentArgs) {
    return this.tabtService.getTournament(args);
  }


  @FieldResolver(returns => [TournamentSerie])
  async SerieEntries(@Root() tournament: Tournament) {
    /*
    if (tournament.SerieCount > 0 && get(tournament, 'SerieEntries[0].ResultEntries')) {
      console.log('not calling for series entries');
      console.log(tournament.SerieEntries[0].ResultEntries[0].AwayPlayer);
      return tournament.SerieEntries
    }
    */

    console.log('calling')
    const request = new GetTournamentArgs();
    request.TournamentUniqueIndex = tournament.UniqueIndex;
    request.WithResults = true;

    const fullTournament = await this.tabtService.getTournament(request);
    console.log(fullTournament)
    console.log(fullTournament.SerieEntries[0].ResultEntries[0].AwayPlayer);

    return fullTournament.SerieEntries
  }

}
