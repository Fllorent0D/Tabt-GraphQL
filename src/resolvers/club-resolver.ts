import {Arg, Ctx, FieldResolver, Info, Query, Resolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';

import {Club} from '../entities/Club';
import {PlayerInfo} from '../entities/PlayerInfo';
import {ClubCategory} from '../entities/ClubCategory';
import {GraphQlContext} from '../index';
import {CacheControl} from '../middlewares/cache-control';
import {GraphQLResolveInfo} from 'graphql';

@Resolver(Club)
export class ClubResolver {

	constructor(
		@OrmRepository(Club) private clubRepository: Repository<Club>
	) {
	}

	@Query(() => Club)
	async club(
		@Arg('clubId') clubIndex: string,
		@Info() info: GraphQLResolveInfo,
		@Ctx() context: GraphQlContext): Promise<Club> {
		return context.dataloaderTest.loadEntity(Club, 'club').where('club.id = :id', {id: clubIndex}).info(info).loadOne();
	}

	@Query(() => [Club])
	async clubs(
		@Info() info: GraphQLResolveInfo,
		@Ctx() context: GraphQlContext
	): Promise<Club[]> {
		return context.dataloaderTest.loadEntity(Club).info(info).loadMany();
		//return this.clubRepository.find();
	}

	@FieldResolver(() => [PlayerInfo])
	async members(@Root() club: Club, @Ctx() context: GraphQlContext
	): Promise<PlayerInfo[]> {
		return context.memberClubLoader.load(club.id);
	}

	/*
		@FieldResolver(() => ClubCategory)
		@CacheControl({maxAge: 60})
		async category(@Root() club: Club, @Ctx() context: GraphQlContext) {
			return context.categoryLoader.load(club.categoryId);
		}
	*/
}
