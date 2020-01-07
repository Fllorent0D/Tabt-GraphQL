import {Level} from '../entities/level';
import {Arg, Query, Resolver} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';

@Resolver(Level)
export class LevelResolver {

  constructor(
    @OrmRepository(Level) private levelRepo: Repository<Level>
  ) {
  }

  @Query(returns => Level)
  async level(
    @Arg('id') id: number
  ): Promise<Level> {
    return this.levelRepo.findOne(id);
  }

  @Query(returns => [Level])
  async levels(): Promise<Level[]> {
    return this.levelRepo.find();
  }


}
