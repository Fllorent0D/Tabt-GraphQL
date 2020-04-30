import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('playerwrinfo', { schema: 'tabt' })
export class PlayerWorldRankInfo {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'wr_id'
  })
  wr_id: number;

  @Column('tinyint', {
    nullable: false,
    name: 'playercategory'
  })
  playercategory: number;

  @Column('date', {
    nullable: false,
    name: 'date'
  })
  date: string;

  @Column('char', {
    nullable: false,
    length: 7,
    name: 'name'
  })
  name: string;
}
