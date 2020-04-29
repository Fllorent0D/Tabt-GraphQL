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
} from 'typeorm';

@Entity('apicurrentquota', {schema: 'tabt'})
export class apicurrentquota {
  @Column('int', {
    nullable: false,
    unsigned: true,
    name: 'id'
  })
  @PrimaryColumn()
  id: number | null;

  @Column('double', {
    nullable: false,
    precision: 2,
    name: 'site_id'
  })
  @PrimaryColumn()
  site_id: number;

  @Column('double', {
    nullable: false,
    precision: 22,
    name: 'lastused'
  })
  lastused: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'consumed'
  })
  consumed: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'quota'
  })
  quota: number;
}
