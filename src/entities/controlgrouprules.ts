import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('controlgrouprules', { schema: 'tabt' })
export class controlgrouprules {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    name: 'season'
  })
  season: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'control_group_id'
  })
  control_group_id: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'rule_id'
  })
  rule_id: number;

  @Column('enum', {
    nullable: false,
    default: () => "'Y'",
    enum: ['Y', 'N'],
    name: 'active'
  })
  active: string;
}
