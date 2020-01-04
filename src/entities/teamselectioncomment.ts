import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('teamselectioncomment', { schema: 'tabt' })
export class teamselectioncomment {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('smallint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'club_id'
  })
  club_id: number;

  @Column('int', {
    nullable: false,
    primary: true,
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
    default: () => "'0'",
    name: 'week'
  })
  week: number;

  @Column('mediumtext', {
    nullable: true,
    name: 'comment'
  })
  comment: string | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;
}
