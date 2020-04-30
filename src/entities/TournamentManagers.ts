import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('tournamentmanagers', { schema: 'tabt' })
export class TournamentManagers {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('int', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'tournament_id'
  })
  tournament_id: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'player_id'
  })
  player_id: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'added_by'
  })
  added_by: number | null;
}
