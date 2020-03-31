import {createUnionType, Field, ObjectType} from 'type-graphql';

@ObjectType()
export class LoginUnsuccessful {
	@Field(() => String)
	message: string;

	constructor(message: string) {
		this.message = message;
	}
}

@ObjectType()
export class LoginSuccessful {
	@Field()
	access_token: string;

	@Field(() => [String])
	claims: string[];

	constructor(access_token: string, claims: string[]) {
		this.access_token = access_token;
		this.claims = claims;
	}
}

export const LoginResult = createUnionType({
	name: "LoginResults",
	types: [LoginSuccessful, LoginUnsuccessful],
	resolveType: (value: LoginSuccessful | LoginUnsuccessful) => (value instanceof LoginSuccessful) ? LoginSuccessful : LoginUnsuccessful
});
