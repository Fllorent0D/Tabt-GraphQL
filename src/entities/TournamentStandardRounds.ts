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
import {TournamentRegularityRankings} from "./TournamentRegularityRankings";


@Entity("tournamentstandardrounds", {schema: "Tabt"})
export class TournamentStandardRounds {

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


	@Column("varchar", {
		nullable: true,
		length: 100,
		name: "winner_name"
	})
	winner_name: string | null;


	@Column("varchar", {
		nullable: true,
		length: 100,
		name: "loser_name"
	})
	loser_name: string | null;

	@OneToMany(() => TournamentRegularityRankings, (tournamentregularityrankings: TournamentRegularityRankings) => tournamentregularityrankings.round, {
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT'
	})
	tournamentRegularityRankings: TournamentRegularityRankings[];

}
