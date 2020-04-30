import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	RelationId
} from 'typeorm';
import {PlayerCategory} from './PlayerCategory';
import {Field, ObjectType} from 'type-graphql';
import {ClassementInfo} from './ClassementInfo';

@Entity('playerclassement', {schema: 'tabt'})
export class PlayerClassement {
	@Column('int', {
		nullable: false,
		primary: true,
		unsigned: true,
		default: () => "'0'",
		name: 'player_id'
	})
	player_id: number;

	@Column('tinyint', {
		nullable: false,
		primary: true,
		default: () => "'0'",
		name: 'season'
	})
	season: number;

	@Column('tinyint', {
		nullable: false,
		primary: true,
		unsigned: true,
		default: () => "'1'",
		name: 'category'
	})
	category: number;

	@Column('tinyint', {
		nullable: false,
		unsigned: true,
		default: () => "'0'",
		name: 'classement_id'
	})
	classement_id: number;

	//DO not use
	player_category: PlayerCategory;
	player_classement: ClassementInfo;

}

@ObjectType()
export class PlayerRanking {
	@Field()
	ranking: string;

	@Field()
	sex: string;

	@Field()
	categoryName: string;

	@Field()
	categoryShortName: string;

	constructor(ranking: string, sex: string, categoryName: string, categoryShortName: string) {
		this.ranking = ranking;
		this.sex = sex;
		this.categoryName = categoryName;
		this.categoryShortName = categoryShortName;
	}
}
