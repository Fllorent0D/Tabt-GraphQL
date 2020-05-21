import {Level} from '../entities/Level';
import {Arg, Ctx, Query, Resolver, Info, FieldResolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {Division} from '../entities/Division';
import {GraphQlContext} from '../index';

@Resolver(Level)
export class LevelResolver {

	constructor(@OrmRepository(Level) private levelRepo: Repository<Level>) {
	}

	@Query(returns => Level)
	async level(@Arg('id', {nullable: false}) id: number, @Ctx() context: any): Promise<Level> {
		return context.levelLoader.load(id);
	}

	@Query(returns => [Level])
	async levels(): Promise<Level[]> {
		return this.levelRepo.find();
	}

	@FieldResolver(() => [Division])
	async divisions(@Root() level: Level, @Ctx() context: GraphQlContext): Promise<Division[]> {
		return context.levelDivisionLoader.load(level.id);
	}


}
