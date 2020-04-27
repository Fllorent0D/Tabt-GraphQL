import {Arg, Field, Mutation, ObjectType, Resolver} from 'type-graphql';
import {getRepository} from 'typeorm';
import {AuthUser} from '../entities/auth_user';
import * as crypto from "crypto";
import * as jwt from 'jsonwebtoken';
import {LoginResult, LoginSuccessful, LoginUnsuccessful} from '../exceptions/InvalidPasswordException';

@Resolver()
export class AuthUserResolver {
	@Mutation(() => LoginResult)
	async login(@Arg("username") username: string, @Arg("password") password: string): Promise<typeof LoginResult> {
		const user = await getRepository(AuthUser).findOne({
			username,
			password: crypto.createHash('md5').update(password).digest("hex")
		});
		if (user) {
			const contextUser = {
				claims: user.perms.split(',')
			};

			const token = jwt.sign(contextUser, process.env.JWT_SECRET_SALT, {
				audience: user.user_id,
				algorithm: 'HS256',
				expiresIn: process.env.JWT_EXPIRE_TIME,
				jwtid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
			});

			return new LoginSuccessful(token, contextUser.claims);
		}

		return new LoginUnsuccessful('Invalid credentials');

	}
}
