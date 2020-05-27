import {ClubResolver} from './club-resolver';
import {Repository} from 'typeorm';
import {Club} from '../entities/Club';
import {GraphQlContext} from '../index';
import DoneCallback = jest.DoneCallback;

describe('ClubResolver', () => {
	let resolver: ClubResolver;
	let clubRepository: Repository<Club> = {find: jest.fn()} as unknown as Repository<Club>;
	// TODO Create general helpers that creates that fake graphqlcontext
	const graphQlContext: GraphQlContext = {
		clubIndexLoader: {
			load: jest.fn()
		},
		memberClubLoader: {
			load: jest.fn()
		},
		clubTeamsLoader: {
			load: jest.fn()
		},
		categoryLoader: {
			load: jest.fn()
		},
		venueLoader: {
			load: jest.fn()
		}
	} as unknown as GraphQlContext;

	const testClub: Partial<Club> = {
		'id': 5,
		'categoryId': 2,
		'name': 'Blok',
		'short_name': 'Blok',
		'index': '003',
		'site': null,
		'admin_name': null,
		'admin_mail': null,
		'is_english': 1,
		'is_french': 1,
		'is_dutch': 1,
		'is_german': 1,
		'is_dead': 0,
		'first_season': null,
		'last_season': 17,
		'is_category_default': 'N'
	};

	beforeEach(async () => {
		resolver = new ClubResolver(clubRepository);
	});

	describe('club query', () => {
		it('should call clubIndexLoader with club index', async (done: DoneCallback) => {
			// Arrange
			const spyOnClubIndexLoader = spyOn(graphQlContext.clubIndexLoader, 'load')
				.and.returnValue(Promise.resolve(testClub));
			const testId = 'clubId';

			// Act
			const result = await resolver.club(testId, graphQlContext);

			// Assert
			expect(spyOnClubIndexLoader).toHaveBeenCalledWith(testId);
			expect(spyOnClubIndexLoader).toHaveBeenCalledTimes(1);
			expect(result).toEqual(testClub);
			done();
		});
	});
});
