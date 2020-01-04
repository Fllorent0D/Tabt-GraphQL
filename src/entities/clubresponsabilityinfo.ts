import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm'

@Entity('clubresponsabilityinfo', { schema: 'tabt' })
export class clubresponsabilityinfo {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('char', {
    nullable: false,
    primary: true,
    length: 2,
    default: () => "'nl'",
    name: 'lang'
  })
  lang: string;

  @Column('varchar', {
    nullable: false,
    length: 40,
    name: 'name'
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'description'
  })
  description: string;

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
