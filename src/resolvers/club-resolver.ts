import {Arg, Authorized, Ctx, FieldResolver, Info, Query, Resolver, Root} from 'type-graphql';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';

import {Club} from '../entities/Club';
import {PlayerInfo} from '../entities/PlayerInfo';
import {ClubTeam} from '../entities/ClubTeam';
import {ClubCategory} from '../entities/ClubCategory';
import {Venue} from '../entities/Venue';
import {GraphQlContext} from '../index';
import {UserRights} from '../middlewares/auth-checker';
import {CacheControl} from '../middlewares/cache-control';

@Resolver(Club)
export class ClubResolver {

	constructor(
		@OrmRepository(Club) private clubRepository: Repository<Club>
	) {
	}

	@Query(() => Club, {description: "Returns details about a specific club"})
	async club(
		@Arg('index') clubIndex: string,
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
	@CacheControl({maxAge: 60})
	async category(@Root() club: Club, @Ctx() context: GraphQlContext) {
		return context.categoryLoader.load(club.categoryId);
	}

	@FieldResolver(() => [Venue])
	async address(@Root()club: Club, @Ctx() context: GraphQlContext) {
		return context.venueLoader.load(club.id);
	}

}
