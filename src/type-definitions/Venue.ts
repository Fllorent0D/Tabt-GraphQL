import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Venue {
	@Field()
	public ClubVenue: number;
	@Field()
	public Comment: string;
	@Field()
	public Id: number;
	@Field()
	public Name: string;
	@Field()
	public Phone: string;
	@Field()
	public Street: string;
	@Field()
	public Town: string;
}
