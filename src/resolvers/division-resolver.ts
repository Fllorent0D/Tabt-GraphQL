import {Arg, Ctx, FieldResolver, Info, Query, Resolver, Root} from 'type-graphql';
import {Division} from '../entities/division';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {GraphQLResolveInfo} from 'graphql';
import {ClubTeam} from '../entities/club-team';
import {divisionTeamsLoader} from '../loaders/team.loader';

@Resolver(Division)
export class DivisionResolver {
  constructor(
    @OrmRepository(Division) private divisionRepository: Repository<Division>
  ) {
  }

  @Query(() => [Division])
  async divisions(@Ctx() context: any,
                  @Info() info: GraphQLResolveInfo): Promise<Division[]> {
    return context.loader.loadMany(Division, {}, info);
  }

  @Query(() => Division)
  async division(
    @Arg('divisionId') divisionId: number,
    @Ctx() context: any,
    @Info() info: GraphQLResolveInfo
  ): Promise<Division> {
    return context.loader.loadOne(Division, {id: divisionId}, info);
  }

  @FieldResolver(() => [ClubTeam])
  async teams(
    @Root() division: Division,
    @Ctx() context: any,
    @Info() info: GraphQLResolveInfo
  ): Promise<ClubTeam[]> {
    return context.divisionClubTeamsLoader.load(division.id);
  }

}
