import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('auth_user', { schema: 'tabt' })
@Index('k_username', ['username'], { unique: true })
export class AuthUser {
  @Column('varchar', {
    nullable: false,
    primary: true,
    length: 32,
    name: 'user_id'
  })
  user_id: string;

  @Column('varchar', {
    nullable: false,
    unique: true,
    length: 32,
    name: 'username'
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'password'
  })
  password: string;

  @Column('varchar', {
    nullable: true,
    name: 'perms'
  })
  perms: string | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'player_id'
  })
  player_id: number | null;

  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'conf_id'
  })
  conf_id: string | null;

  @Column('timestamp', {
    nullable: true,
    name: 'conf_sent_on'
  })
  conf_sent_on: Date | null;

  @Column('varchar', {
    nullable: true,
    length: 60,
    name: 'conf_sent_to'
  })
  conf_sent_to: string | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'restrict_to_ip'
  })
  restrict_to_ip: number | null;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'api_only'
  })
  api_only: string;
}
