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
} from "typeorm";
import {PlayerInfo} from './PlayerInfo';


@Entity("playerwrid", {schema: "Tabt"})
@Index("playerwrid_playerinfo_FK", ["player"])
export class PlayerWorldRank {

	@ManyToOne(() => PlayerInfo, (playerinfo: PlayerInfo) => playerinfo.playerwrs, {
		nullable: false,
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT',
		primary: true
	})
	@JoinColumn({name: 'player_id'})
	player: PlayerInfo | null;


	@Column("int", {
		nullable: false,
		unsigned: true,
		name: "ittf_id"
	})
	ittf_id: number;

}
