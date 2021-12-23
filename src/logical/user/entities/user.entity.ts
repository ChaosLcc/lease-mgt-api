import { Column, Entity } from 'typeorm'
import { Content } from '../../content/entities/content.entity'

@Entity()
export class User extends Content {
  @Column({
    nullable: false,
    unique: true,
    length: 50,
    comment: '用户名',
  })
  username: string

  @Column({
    nullable: false,
    length: 100,
    comment: '密码',
  })
  password: string

  @Column({
    name: 'password-salt',
    nullable: false,
    length: 10,
    comment: '密码盐',
  })
  passwordSalt: string

  @Column({
    nullable: false,
    default: '',
    comment: '用户邮箱',
  })
  email: string

  @Column({
    nullable: false,
    default: '',
    comment: '用户昵称',
  })
  nickname: string

  @Column({
    nullable: false,
    default: 3, // 1-超级管理员 2-测试用户 3-普通用户
    comment: '用户角色值',
  })
  role: number

  @Column('text', {
    comment: '备注',
    nullable: true,
  })
  remark: string

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '用户状态,1表示正常,0表示禁用',
  })
  status: number

  @Column({
    length: 20,
    comment: '手机号',
  })
  phone: string

  @Column({
    name: 'true_name', // mysql的命名规范是下划线
    length: 10,
    comment: '真实姓名',
  })
  trueName: string
}
