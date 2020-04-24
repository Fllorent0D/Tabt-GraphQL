import {AuthChecker} from 'type-graphql';
import {GraphQlContext} from '../index';

export enum UserRights {
	User = "user",
	Club = "club",
	Province = "province",
	Admin = "admin",
	Supervisor = "supervisor",
	Tournament = "tournament",
	Classement = "classement",
	Export = "export"
}

export const customAuthChecker: AuthChecker<GraphQlContext, UserRights> = ({root, args, context}, roles: UserRights[]) => {
	if (roles.length === 0) {
		// if `@Authorized()`, check only is user exist
		return context.authenticated;
	}

	return context.claims?.some(role => roles.includes(role));
};
