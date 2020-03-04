import {Arg, Authorized, Ctx, FieldResolver, Info, Query, Resolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';

import {Club} from '../entities/club';
import {PlayerInfo} from '../entities/player-info';
import {ClubTeam} from '../entities/club-team';
import {ClubCategory} from '../entities/club-category';
import {Venue} from '../entities/venue';
import {GraphQlContext} from '../index';
import {UserRights} from '../middlewares/auth-checker';

@Resolver(Club)
export class ClubResolver {

	constructor(
		@OrmRepository(Club) private clubRepository: Repository<Club>
	) {
	}

	@Query(() => Club)
	async club(
		@Arg('clubId') clubIndex: string,
		@Ctx() context: GraphQlContext): Promise<Club> {
		return context.clubIndexLoader.load(clubIndex);
	}

	@Query(() => [Club])
	async clubs(): Promise<Club[]> {
		return this.clubRepository.find();
	}

	@FieldResolver(() => [PlayerInfo])
	async members(@Root() club: Club, @Ctx() context: GraphQlContext
	): Promise<PlayerInfo[]> {
		return context.memberClubLoader.load(club.id);
	}

	@FieldResolver(() => [ClubTeam])
	async teams(@Root() club: Club, @Ctx() context: GraphQlContext
	): Promise<ClubTeam[]> {
		return context.clubTeamsLoader.load(club.id);
	}

	@FieldResolver(() => ClubCategory)
	async category(@Root() club: Club, @Ctx() context: GraphQlContext) {
		return context.categoryLoader.load(club.categoryId);
	}

	@FieldResolver(() => [Venue])
	async address(@Root()club: Club, @Ctx() context: GraphQlContext) {
		return context.venueLoader.load(club.id);
	}

}
