import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('matchcomments', { schema: 'tabt' })
export class matchcomments {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'user_id'
  })
  user_id: string;

  @Column('datetime', {
    nullable: true,
    name: 'date'
  })
  date: Date | null;

  @Column('varchar', {
    nullable: false,
    name: 'IP'
  })
  IP: string;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'match_id'
  })
  match_id: number;

  @Column('mediumtext', {
    nullable: false,
    name: 'message'
  })
  message: string;

  @Column('enum', {
    nullable: true,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'private'
  })
  private: string | null;
}
