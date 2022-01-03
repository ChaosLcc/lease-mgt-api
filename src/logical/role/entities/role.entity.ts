import { Content } from '../../content/entities/content.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
export class Role extends Content {
  @Column({
    nullable: false,
    name: 'role_name',
    unique: true,
    length: 20,
    comment: '角色名称',
  })
  roleName: string

  @Column({
    nullable: false,
    name: 'role_value',
    unique: true,
    length: 20,
    comment: '角色值',
  })
  roleValue: string

  @Column({
    nullable: false,
    default: '',
    length: 100,
    comment: '备注',
  })
  remark: string

  @Column({
    nullable: false,
    default: 1,
    type: 'tinyint',
    comment: '角色状态 0-不可用 1可用',
  })
  status: number

  // @OneToMany(() => User, (user) => user.role, {
  //   eager: false,
  // })
  // users: User[]
}
