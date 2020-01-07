import {Arg, Query, Resolver} from 'type-graphql';
import {Division} from '../entities/division';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';

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
    return this.divisionRepository.findOne(divisionId);
  }

}
