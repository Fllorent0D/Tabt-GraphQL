import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('tournamentplayers', { schema: 'tabt' })
@Index('serie_id', ['serie_id'])
export class tournamentplayers {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'tournament_id'
  })
  tournament_id: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'serie_id'
  })
  serie_id: number;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'player_id'
  })
  player_id: number | null;

  @Column('timestamp', {
    nullable: true,
    name: 'registration_date'
  })
  registration_date: Date | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'linked_player_id'
  })
  linked_player_id: number | null;

  @Column('int', {
    nullable: true,
    name: 'registered_by'
  })
  registered_by: number | null;
}
