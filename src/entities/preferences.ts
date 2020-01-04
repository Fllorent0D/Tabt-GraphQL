import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('preferences', { schema: 'tabt' })
export class preferences {
  @PrimaryGeneratedColumn({
    type: 'mediumint',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('enum', {
    nullable: false,
    default: () => "'user'",
    enum: ['user', 'club', 'province', 'admin'],
    name: 'scope'
  })
  scope: string;

  @Column('varchar', {
    nullable: false,
    length: 18,
    name: 'name'
  })
  name: string;

  @Column('varchar', {
    nullable: true,
    name: 'perms'
  })
  perms: string | null;

  @Column('enum', {
    nullable: false,
    default: () => "'string'",
    enum: ['string', 'yesno'],
    name: 'type'
  })
  type: string;
}
