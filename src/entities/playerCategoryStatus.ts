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
import {seasoninfo} from "./seasoninfo";
import {PlayerInfo} from './player-info';
import {PlayerCategory} from './playerCategory';


@Entity("playercategorystatus", {schema: "Tabt"})
@Index("playercategorystatus_seasonsoninfo_FK", ["season"])
@Index("playercategorystatus_playerinfo_FK", ["player"])
@Index("playercategorystatus_playercategories_FK", ["category"])
export class PlayerCategoryStatus {

	@ManyToOne(() => seasoninfo, (seasoninfo: seasoninfo) => seasoninfo.playercategorystatuss, {
		nullable: false,
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT',
		primary: true
	})
	@JoinColumn({name: 'season'})
	season: seasoninfo | null;


	@ManyToOne(() => PlayerInfo, (playerinfo: PlayerInfo) => playerinfo.playercategorystatuss, {
		nullable: false,
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT',
		primary: true
	})
	@JoinColumn({name: 'player_id'})
	player: PlayerInfo | null;


	@ManyToOne(() => PlayerCategory,
		(playercategories: PlayerCategory) => playercategories.playercategorystatuss,
		{
			nullable: false,
			onDelete: 'RESTRICT',
			onUpdate: 'RESTRICT',
			primary: true
		})
	@JoinColumn({name: 'category_id'})
	category: PlayerCategory | null;


	@Column("char", {
		nullable: false,
		default: () => "'I'",
		name: "status"
	})
	status: string;

}
