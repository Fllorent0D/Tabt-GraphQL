import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('active_sessions', { schema: 'tabt' })
@Index('changed', ['changed'])
export class active_sessions {
  @Column('varchar', {
    nullable: false,
    primary: true,
    length: 32,
    name: 'sid'
  })
  sid: string;

  @Column('varchar', {
    nullable: false,
    primary: true,
    length: 32,
    name: 'name'
  })
  name: string;

  @Column('mediumtext', {
    nullable: true,
    name: 'val'
  })
  val: string | null;

  @Column('varchar', {
    nullable: false,
    length: 14,
    name: 'changed'
  })
  changed: string;
}
