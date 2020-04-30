import {Ctx, FieldResolver, Resolver, Root} from 'type-graphql';
import {ClubCategory} from '../entities/ClubCategory';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Level} from '../entities/Level';
import {In, Repository} from 'typeorm';

@Resolver(ClubCategory)
export class ClubCategoryResolver {
  constructor(
    @OrmRepository(Level) private levelRepo: Repository<Level>
  ) {
  }

  @FieldResolver(() => [Level])
  async levels(@Root() category: ClubCategory, @Ctx() context: any): Promise<Level[]> {
    // ids are stored :1:2:3:
    const ids = category.levels_ids.split(':').map(Number);
    return context.levelLoader.loadMany(ids);
  }


}
