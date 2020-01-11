import {Level} from '../entities/level';
import {Arg, Ctx, Query, Resolver, Info} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {Context} from 'graphql-cli';
import {GraphQLResolveInfo} from 'graphql';

@Resolver(Level)
export class LevelResolver {

  constructor(
    @OrmRepository(Level) private levelRepo: Repository<Level>
  ) {
  }

  @Query(returns => Level)
  async level(
    @Arg('id') id: number,
    @Ctx() context: any,
    @Info() info: GraphQLResolveInfo
  ): Promise<Level> {
    return context.loader.loadOne(Level, {id}, info);
  }

  @Query(returns => [Level])
  async levels(@Ctx() context: any,
               @Info() info: GraphQLResolveInfo): Promise<Level[]> {
    return context.loader.loadMany(Level, {}, info);
  }


}
