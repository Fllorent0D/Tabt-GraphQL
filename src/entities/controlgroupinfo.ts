import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('controlgroupinfo', { schema: 'tabt' })
export class controlgroupinfo {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 25,
    name: 'name'
  })
  name: string;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'classementcategory'
  })
  classementcategory: number;
}
