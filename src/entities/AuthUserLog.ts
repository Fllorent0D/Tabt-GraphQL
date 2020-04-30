import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("auth_user_log" ,{schema:"Tabt" } )
@Index("modified_by",["modified_by",])
export class AuthUserLog {

	@Column("int",{
		nullable:false,
		primary:true,
		unsigned: true,
		name:"modified_player_id"
	})
	modified_player_id:number;


	@Column("varchar",{
		nullable:false,
		name:"old_perms"
	})
	old_perms:string;


	@Column("varchar",{
		nullable:false,
		name:"new_perms"
	})
	new_perms:string;


	@Column("timestamp",{
		nullable:false,
		primary:true,
		default: () => "CURRENT_TIMESTAMP",
		name:"modified"
	})
	modified:Date;


	@Column("int",{
		nullable:false,
		unsigned: true,
		name:"modified_by"
	})
	modified_by:number;

}
