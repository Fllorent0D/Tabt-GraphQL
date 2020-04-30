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
import {TournamentRegularityRankings} from './TournamentRegularityRankings';


@Entity("tournamentregularityrankinginfo", {schema: "Tabt"})
export class TournamentRegularityRankingInfo {

	@PrimaryColumn("int", {
		nullable: false,
		primary: true,
		unsigned: true,
		name: "id"
	})
	id: number;


	@Column("varchar", {
		nullable: false,
		length: 100,
		name: "name"
	})
	name: string;


	@OneToMany(() => TournamentRegularityRankings, (tournamentregularityrankings: TournamentRegularityRankings) => tournamentregularityrankings.regularityranking, {
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT'
	})
	tournamentregularityrankingss: TournamentRegularityRankings[];

}
