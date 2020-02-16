import {createUnionType, Field, ObjectType} from "type-graphql";
import {PlayerInfo} from '../entities/player-info';
import {GraphQLError} from 'graphql';

@ObjectType()
export class NoPlayerIdRegisteredException {
	@Field(() => String)
	message: string;
	constructor(message: string){
		this.message = message
	}

}

export const PlayerInfoOrNotUnion = createUnionType({
	name: "PlayerInfoOrNot",
	types: [PlayerInfo, NoPlayerIdRegisteredException],
	resolveType: (value: PlayerInfo | undefined) => ("message" in value) ? NoPlayerIdRegisteredException : PlayerInfo
});

