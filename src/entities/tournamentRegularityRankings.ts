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
import {TournamentRegularityRankingInfo} from "./tournamentRegularityRankingInfo";
import {TournamentStandardRounds} from './tournamentStandardRounds';


@Entity("tournamentregularityrankings", {schema: "Tabt"})
@Index("regularityrankingid_tournamentregularityrankinginfo_FK", ["regularityranking"])
@Index("roundid_tournamentstandardrounds_FK", ["round"])
export class TournamentRegularityRankings {

	@ManyToOne(() => TournamentRegularityRankingInfo, (tournamentregularityrankinginfo: TournamentRegularityRankingInfo) => tournamentregularityrankinginfo.tournamentregularityrankingss, {
		nullable: false,
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT',
		primary: true
	})
	@JoinColumn({name: 'regularityranking_id'})
	regularityranking: TournamentRegularityRankingInfo | null;

	@Column("int", {
		nullable: true,
		unsigned: true,
		name: "min_participants",
		primary: true
	})
	min_participants: number | null;


	@Column("int", {
		nullable: true,
		unsigned: true,
		name: "max_participants"
	})
	max_participants: number | null;


	@ManyToOne(() => TournamentStandardRounds, (tournamentstandardrounds: TournamentStandardRounds) => tournamentstandardrounds.tournamentregularityrankingss, {
		nullable: false,
		onDelete: 'RESTRICT',
		onUpdate: 'RESTRICT'
	})
	@JoinColumn({name: 'round_id'})
	round: TournamentStandardRounds | null;


	@Column("int", {
		nullable: false,
		name: "winner_points"
	})
	winner_points: number;


	@Column("int", {
		nullable: false,
		name: "loser_points"
	})
	loser_points: number;

}
