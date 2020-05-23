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
import {PlayerClub} from './PlayerClub';
import {Authorized, Field, ID, ObjectType} from 'type-graphql';
import {Club} from './Club';
import {UserRights} from '../middlewares/auth-checker';
import {CacheControl} from '../middlewares/cache-control';
import {PlayerRanking} from './PlayerClassement';
import {PlayerELOHistory} from './PlayerELOHistory';
import {PlayerCategoryStatus} from './PlayerCategoryStatus';
import {PlayerWorldRank} from './PlayerWorldRank';

@ObjectType()
@Entity('playerinfo', {schema: 'tabt'})
@Index('index', ['index'], {unique: true})
export class PlayerInfo {

	@PrimaryGeneratedColumn({
		type: 'int',
		unsigned: true,
		name: 'id'
	})
	readonly id: number;

	@Field()
	@CacheControl({maxAge: 60})
	@Column('varchar', {
		nullable: false,
		length: 50,
		name: 'first_name'
	})
	first_name: string;

	@Field()
	@Column('varchar', {
		nullable: false,
		length: 50,
		name: 'last_name'
	})
	last_name: string;

	@Field()
	@Authorized([UserRights.Admin])
	@Column('varchar', {
		nullable: false,
		length: 60,
		name: 'email'
	})
	email: string;

	@Field()
	@Authorized([UserRights.Admin])
	@Column('varchar', {
		nullable: true,
		name: 'emailcc'
	})
	emailcc: string | null;

	@Field()
	@Column('date', {
		nullable: true,
		name: 'birthdate'
	})
	@Authorized([UserRights.Admin])
	birthdate: string | null;

	@Field(() => ID)
	@Column('int', {
		nullable: true,
		unique: true,
		unsigned: true,
		name: 'vttl_index'
	})
	index: number | null;

	@Field()
	@Column('varchar', {
		nullable: true,
		length: 50,
		name: 'national_number'
	})
	@Authorized([UserRights.Admin])
	nationalNumber: string | null;

	@Field()
	@Column('varchar', {
		nullable: false,
		length: 100,
		name: 'address'
	})
	@Authorized([UserRights.Admin])
	address: string;

	@Field()
	@Column('smallint', {
		nullable: false,
		unsigned: true,
		default: () => "'0'",
		name: 'postcode'
	})
	@Authorized([UserRights.Admin])
	postcode: number;

	@Column('enum', {
		nullable: true,
		enum: ['M', 'F'],
		name: 'sex'
	})
	@Authorized([UserRights.Admin])
	sex: string | null;

	@Field()
	@Column('char', {
		nullable: false,
		length: 2,
		default: () => "'BE'",
		name: 'nationality'
	})
	@Authorized([UserRights.Admin])
	nationality: string;

	@Field()
	@Column('varchar', {
		nullable: true,
		length: 15,
		name: 'home_phone'
	})
	@Authorized([UserRights.Admin])
	home_phone: string | null;

	@Field()
	@Column('varchar', {
		nullable: true,
		length: 15,
		name: 'office_phone'
	})
	@Authorized([UserRights.Admin])
	office_phone: string | null;

	@Field()
	@Column('varchar', {
		nullable: true,
		length: 15,
		name: 'fax'
	})
	@Authorized([UserRights.Admin])
	fax: string | null;

	@Field()
	@Column('varchar', {
		nullable: true,
		length: 15,
		name: 'gsm'
	})
	@Authorized([UserRights.Admin])
	gsm: string | null;

	@Column('text', {
		nullable: true,
		name: 'comment'
	})
	comment: string | null;

	@Column('date', {
		nullable: true,
		name: 'medic_validity'
	})
	medic_validity: string | null;

	@Column('enum', {
		nullable: false,
		default: () => "'N'",
		enum: ['Y', 'N'],
		name: 'is_anonymous'
	})
	is_anonymous: string;

	@Field(() => Club)
	club: Club;

	@Field(() => Number, {nullable: true})
	elo: number | null;

	player_club: PlayerClub;

	@Field(() => [PlayerRanking])
	rankings: PlayerRanking[];

	@Field()
	status: string;

	@Field(() => [PlayerELOHistory])
	eloHistory: PlayerELOHistory[];

	@OneToMany(() => PlayerCategoryStatus, (playercategorystatus: PlayerCategoryStatus) => playercategorystatus.player, {
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT'
	})
	playercategorystatuss: PlayerCategoryStatus[];

	@OneToMany(() => PlayerWorldRank, (playerwrid: PlayerWorldRank) => playerwrid.player, {
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT'
	})
	playerwrs: PlayerWorldRank[];

}
