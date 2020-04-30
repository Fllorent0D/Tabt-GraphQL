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
import {PlayerCategoryStatus} from './PlayerCategoryStatus';

@Entity('playercategories', {schema: 'tabt'})
export class PlayerCategory {
	@PrimaryGeneratedColumn({
		type: 'tinyint',
		unsigned: true,
		name: 'id'
	})
	id: number;

	@Column('varchar', {
		nullable: false,
		length: 20,
		name: 'name'
	})
	name: string;

	@Column('varchar', {
		nullable: false,
		length: 3,
		default: () => "'???'",
		name: 'short_name'
	})
	short_name: string;

	@Column('enum', {
		nullable: true,
		enum: ['M', 'F'],
		name: 'sex'
	})
	sex: string | null;

	@Column('enum', {
		nullable: true,
		enum: ['M', 'F'],
		name: 'non_strict_sex'
	})
	non_strict_sex: string | null;

	@Column('tinyint', {
		nullable: true,
		unsigned: true,
		name: 'min_age'
	})
	min_age: number | null;

	@Column('tinyint', {
		nullable: true,
		unsigned: true,
		name: 'non_strict_min_age'
	})
	non_strict_min_age: number | null;

	@Column('tinyint', {
		nullable: true,
		unsigned: true,
		name: 'max_age'
	})
	max_age: number | null;

	@Column('tinyint', {
		nullable: true,
		unsigned: true,
		name: 'non_strict_max_age'
	})
	non_strict_max_age: number | null;

	@Column('tinyint', {
		nullable: false,
		unsigned: true,
		default: () => "'1'",
		name: 'classementcategory'
	})
	classementcategory: number;

	@Column('enum', {
		nullable: true,
		default: () => "'Y'",
		enum: ['Y', 'N'],
		name: 'min_age_year_only'
	})
	min_age_year_only: string | null;

	@Column('enum', {
		nullable: true,
		default: () => "'Y'",
		enum: ['Y', 'N'],
		name: 'max_age_year_only'
	})
	max_age_year_only: string | null;

	@Column('mediumtext', {
		nullable: true,
		name: 'group'
	})
	group: string | null;

	@Column('mediumint', {
		nullable: false,
		default: () => "'0'",
		name: 'order'
	})
	order: number;

	@Column('enum', {
		nullable: false,
		default: () => "'Y'",
		enum: ['Y', 'N'],
		name: 'show_index'
	})
	show_index: string;

	@OneToMany(() => PlayerCategoryStatus, (playercategorystatus: PlayerCategoryStatus) => playercategorystatus.category, {
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT'
	})
	playercategorystatuss: PlayerCategoryStatus[];

}
