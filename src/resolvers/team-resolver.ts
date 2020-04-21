import {Ctx, FieldResolver, Info, Resolver, Root} from 'type-graphql';
import {ClubTeam} from '../entities/club-team';
import {GraphQLError, GraphQLResolveInfo} from 'graphql';
import {Club} from '../entities/club';
import {Division} from '../entities/division';
import {GraphQlContext} from '../index';
import {MatchResult} from '../entities/matchResult';

@Resolver(ClubTeam)
export class TeamResolver {
  @FieldResolver(() => Club)
  async club(@Root() team: ClubTeam, @Ctx() context: GraphQlContext): Promise<Club> {
    return context.clubLoader.load(team.club_id);
  }

  @FieldResolver(() => Division)
  async division(@Root() team: ClubTeam, @Ctx() context: GraphQlContext): Promise<Division> {
    return context.divisionLoader.load(team.div_id);
  }

  @FieldResolver(() => [MatchResult])
  async matches(@Root() team: ClubTeam, @Ctx() context: GraphQlContext): Promise<MatchResult[]> {
    return context.divisionLoader.load(team.div_id);
  }

}
