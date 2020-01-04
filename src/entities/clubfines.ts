import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('clubfines', { schema: 'tabt' })
@Index('club_id', ['club_id'])
export class clubfines {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'club_id'
  })
  club_id: number;

  @Column('char', {
    nullable: true,
    name: 'team_indice'
  })
  team_indice: string | null;

  @Column('char', {
    nullable: false,
    length: 3,
    name: 'week_name'
  })
  week_name: string;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'fine_id'
  })
  fine_id: number;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'div_id'
  })
  div_id: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'match_nb'
  })
  match_nb: number | null;

  @Column('varchar', {
    nullable: false,
    name: 'comment'
  })
  comment: string;

  @Column('float', {
    nullable: false,
    default: () => "'0'",
    precision: 12,
    name: 'value'
  })
  value: number;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'linked_fine_id'
  })
  linked_fine_id: number | null;

  @Column('smallint', {
    nullable: true,
    unsigned: true,
    name: 'linked_club_id'
  })
  linked_club_id: number | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'modified_by'
  })
  modified_by: number;
}
