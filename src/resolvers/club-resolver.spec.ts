import {GraphQLSchema} from 'graphql';
import {buildSchema} from 'type-graphql';
import {ClubResolver} from './club-resolver';

describe("ClubResolver", () => {
	let schema: GraphQLSchema;

	beforeAll(async () => {
		schema = await buildSchema({
			resolvers: [ClubResolver],
			authChecker: () => true
		});
	});


	it('should work', () => {
		expect(true).toBeTruthy();
	});
});
