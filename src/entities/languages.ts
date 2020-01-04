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

@Entity('languages', {schema: 'tabt'})
export class languages {
  @Column('char', {
    nullable: false,
    primary: true,
    length: 2,
    name: 'id'
  })
  id: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'description'
  })
  description: string;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    name: 'order'
  })
  order: boolean | null;
}
