import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('belcategoryinfo', { schema: 'tabt' })
export class belcategoryinfo {
  @PrimaryGeneratedColumn({
    type: 'int',
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

  @Column('float', {
    nullable: false,
    unsigned: true,
    precision: 12,
    name: 'factor'
  })
  factor: number;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'1'",
    name: 'count_factor'
  })
  count_factor: number | null;
}
