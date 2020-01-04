import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('teamselection', { schema: 'tabt' })
export class teamselection {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('smallint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'club_id'
  })
  club_id: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'div_id'
  })
  div_id: number;

  @Column('char', {
    nullable: false,
    primary: true,
    name: 'team_indice'
  })
  team_indice: string;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'week'
  })
  week: number;

  @Column('smallint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'position'
  })
  position: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'player_id'
  })
  player_id: number;

  @Column('enum', {
    nullable: true,
    enum: ['P', 'R', 'A', '?', 'W', 'D'],
    name: 'status'
  })
  status: string | null;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'captain'
  })
  captain: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;
}
