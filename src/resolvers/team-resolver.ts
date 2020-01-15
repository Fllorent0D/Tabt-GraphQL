import {Ctx, FieldResolver, Info, Resolver, Root} from 'type-graphql';
import {ClubTeam} from '../entities/club-team';
import {GraphQLResolveInfo} from 'graphql';
import {Club} from '../entities/club';

@Resolver(ClubTeam)
export class TeamResolver {
  @FieldResolver(() => Club)
  async club(@Root() team: ClubTeam, @Ctx() context: any): Promise<Club> {
    return context.clubLoader.load(team.club_id);
  }
}
