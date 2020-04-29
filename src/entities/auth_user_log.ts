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

@Entity('auth_user_log', {schema: 'tabt'})
@Index('modified_by', ['modified_by'])
export class AuthUser {
	@Column('int', {
		nullable: false,
		unsigned: true,
		name: 'modified_player_id'
	})
	@PrimaryColumn()
	modified_player_id: number;


	@Column('varchar', {
		nullable: false,
		length: 255,
		name: 'old_perms'
	})
	old_perms: string;

	@Column('varchar', {
		nullable: false,
		length: 255,
		name: 'new_perms'
	})
	new_perms: string;

	@Column('varchar', {
		nullable: false,
		length: 80,
		name: 'name'
	})
	name: string;

	@Column('int', {
		nullable: false,
		unsigned: true,
		name: 'modified_player_id'
	})
	@PrimaryColumn()
	modified_by: number;


}
