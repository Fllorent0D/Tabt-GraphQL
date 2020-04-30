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

@Entity('tournaments', {schema: 'tabt'})
export class Tournaments {
	@PrimaryGeneratedColumn({
		type: 'int',
		unsigned: true,
		name: 'id'
	})
	id: number;

	@Column('smallint', {
		nullable: false,
		unsigned: true,
		default: () => "'0'",
		name: 'season'
	})
	season: number;

	@Column('varchar', {
		nullable: false,
		length: 85,
		name: 'name'
	})
	name: string;

	@Column('varchar', {
		nullable: true,
		length: 20,
		name: 'short_name'
	})
	short_name: string | null;

	@Column('date', {
		nullable: false,
		name: 'date_from'
	})
	date_from: string;

	@Column('date', {
		nullable: true,
		name: 'date_to'
	})
	date_to: string | null;

	@Column('varchar', {
		nullable: true,
		length: 100,
		name: 'address_venue'
	})
	address_venue: string | null;

	@Column('varchar', {
		nullable: true,
		length: 100,
		name: 'address_street'
	})
	address_street: string | null;

	@Column('int', {
		nullable: true,
		name: 'address_zip'
	})
	address_zip: number | null;

	@Column('varchar', {
		nullable: true,
		length: 100,
		name: 'address_town'
	})
	address_town: string | null;

	@Column('date', {
		nullable: true,
		name: 'registration_date'
	})
	registration_date: string | null;

	@Column('varchar', {
		nullable: true,
		length: 20,
		name: 'authorisation_ref'
	})
	authorisation_ref: string | null;

	@Column('varchar', {
		nullable: true,
		length: 200,
		name: 'url_rules'
	})
	url_rules: string | null;

	@Column('tinyint', {
		nullable: true,
		default: () => "'0'",
		name: 'max_serie'
	})
	max_serie: number | null;

	@Column('tinyint', {
		nullable: true,
		default: () => "'0'",
		name: 'max_serie_per_day'
	})
	max_serie_per_day: number | null;

	@Column('varchar', {
		nullable: true,
		length: 200,
		name: 'mail_notification'
	})
	mail_notification: string | null;

	@Column('int', {
		nullable: true,
		unsigned: true,
		name: 'responsible_id'
	})
	responsible_id: number | null;

	@Column('varchar', {
		nullable: true,
		length: 15,
		name: 'responsible_phone'
	})
	responsible_phone: string | null;

	@Column('varchar', {
		nullable: true,
		length: 15,
		name: 'responsible_fax'
	})
	responsible_fax: string | null;

	@Column('varchar', {
		nullable: true,
		length: 50,
		name: 'responsible_email'
	})
	responsible_email: string | null;

	@Column('tinyint', {
		nullable: true,
		unsigned: true,
		name: 'level'
	})
	level: number | null;

	@Column('longtext', {
		nullable: true,
		name: 'comment'
	})
	comment: string | null;

	@Column('longtext', {
		nullable: true,
		name: 'mail_comment'
	})
	mail_comment: string | null;

	@Column('timestamp', {
		nullable: true,
		name: 'modified'
	})
	modified: Date | null;

	@Column('int', {
		nullable: true,
		unsigned: true,
		name: 'validated_by'
	})
	validated_by: number | null;

	@Column('enum', {
		nullable: false,
		default: () => "'Y'",
		enum: ['Y', 'N'],
		name: 'open_registration'
	})
	open_registration: string;

	@Column('int', {
		nullable: false,
		unsigned: true,
		default: () => "'0'",
		name: 'bel_category'
	})
	bel_category: number;

	@Column('enum', {
		nullable: false,
		default: () => "'N'",
		enum: ['Y', 'N'],
		name: 'regularity_ranking'
	})
	regularity_ranking: string;
}
