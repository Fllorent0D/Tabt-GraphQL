import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('playerstatusinfo', { schema: 'tabt' })
export class PlayerStatusInfo {
  @Column('char', {
    nullable: false,
    primary: true,
    name: 'status'
  })
  status: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'name'
  })
  name: string | null;

  @Column('tinyint', {
    nullable: false,
    default: () => "'1'",
    name: 'order'
  })
  order: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'is_active'
  })
  is_active: number;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    default: () => "'1'",
    name: 'is_playerlist'
  })
  is_playerlist: boolean | null;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    default: () => "'1'",
    name: 'is_matchsheet'
  })
  is_matchsheet: boolean | null;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'is_default'
  })
  is_default: number;
}
