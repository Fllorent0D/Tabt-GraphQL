import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('levelinfo', { schema: 'tabt' })
export class levelinfo {
  @PrimaryGeneratedColumn({
    type: 'tinyint',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'name'
  })
  name: string;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'order'
  })
  order: number;

  @Column('varchar', {
    nullable: true,
    length: 4,
    name: 'export_name'
  })
  export_name: string | null;

  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'division_name_prefix'
  })
  division_name_prefix: string | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'responsible_id'
  })
  responsible_id: number | null;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    default: () => "'1'",
    name: 'has_match_referee'
  })
  has_match_referee: boolean | null;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    default: () => "'0'",
    name: 'has_room_responsible'
  })
  has_room_responsible: boolean | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'first_season'
  })
  first_season: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'last_season'
  })
  last_season: number | null;
}
