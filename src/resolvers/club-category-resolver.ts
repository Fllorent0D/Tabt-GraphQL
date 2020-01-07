import {FieldResolver, Resolver, Root} from 'type-graphql';
import {ClubCategory} from '../entities/club-category';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Level} from '../entities/level';
import {In, Repository} from 'typeorm';

@Resolver(ClubCategory)
export class ClubCategoryResolver {
  constructor(
    @OrmRepository(Level) private levelRepo: Repository<Level>
  ) {
  }

  @FieldResolver(() => [Level])
  async levels(@Root() category: ClubCategory): Promise<Level[]> {
    // ids are stored :1:2:3:
    const ids = category.levels_ids.split(':');
    return this.levelRepo.find({
      where: {
        id: In(ids)
      }
    })
  }


}
