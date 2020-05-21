import {Ctx, FieldResolver, Info, Resolver, Root} from 'type-graphql';
import {ClubCategory} from '../entities/ClubCategory';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Level} from '../entities/Level';
import {In, Repository} from 'typeorm';
import {GraphQlContext} from '../index';
import {GraphQLResolveInfo} from 'graphql';

@Resolver(ClubCategory)
export class ClubCategoryResolver {
  constructor(
    @OrmRepository(Level) private levelRepo: Repository<Level>
  ) {
  }

  @FieldResolver(() => [Level])
  async levels(@Root() category: ClubCategory, @Ctx() context: GraphQlContext, @Info() info: GraphQLResolveInfo): Promise<Level[]> {
    // ids are stored :1:2:3:
    const ids = category.levels_ids.split(':').map(Number);
    return context.dataloaderTest.loadEntity(Level, 'level').where('level.id', {'id': In(ids)}).info(info).loadMany();
  }


}
