import {Arg, Ctx, FieldResolver, Info, Query, Resolver, Root} from 'type-graphql';
import {Division} from '../entities/Division';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {ClubTeam} from '../entities/ClubTeam';
import {Level} from '../entities/Level';
import {ClubCategory} from '../entities/ClubCategory';
import {GraphQlContext} from '../index';
import {MatchResult} from '../entities/MatchResult';
import {DivisionCategory} from '../entities/DivisionCategory';

@Resolver(Division)
export class DivisionResolver {
  constructor(
    @OrmRepository(Division) private divisionRepository: Repository<Division>
  ) {
  }

  @Query(() => [Division])
  async divisions(): Promise<Division[]> {
    return this.divisionRepository.find();
  }

  @Query(() => Division)
  async division(@Arg('divisionId') divisionId: number): Promise<Division> {
    return this.divisionRepository.findOne({id: divisionId});
  }

  @FieldResolver(() => [ClubTeam])
  async teams(@Root() division: Division, @Ctx() context: any): Promise<ClubTeam[]> {
    return context.divisionClubTeamsLoader.load(division.id);
  }

  @FieldResolver(() => Level)
  async level(@Root() division: Division, @Ctx() context: any): Promise<Level> {
    return context.levelLoader.load(division.level_id);
  }

  @FieldResolver(() => DivisionCategory)
  async category(@Root() division: Division, @Ctx() context: GraphQlContext): Promise<DivisionCategory> {
    return context.categoryDivisionLoader.load(division.category_id);
  }
  @FieldResolver(() => [MatchResult])
  async matches(@Root() division: Division, @Ctx() context: GraphQlContext): Promise<MatchResult[]> {
    return context.divisionMatchResultsLoader.load(division.id);
  }

}
