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

	constructor(access_token: string) {
		this.access_token = access_token;
	}
}

export const LoginResult = createUnionType({
	name: "LoginResults",
	types: [LoginSuccessful, LoginUnsuccessful],
	resolveType: (value: LoginSuccessful | LoginUnsuccessful) => (value instanceof LoginSuccessful) ? LoginSuccessful : LoginUnsuccessful
});
