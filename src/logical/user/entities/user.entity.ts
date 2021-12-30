import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Content } from '../../content/entities/content.entity'
import { Role } from '../../role/entities/role.entity'

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

  // 如何使用关系id而不加入关系
  // 不显示声明的情况, 返回结果没有roleId字段
  // https://typeorm.biunav.com/zh/relations-faq.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E5%85%B3%E7%B3%BBid%E8%80%8C%E4%B8%8D%E5%8A%A0%E5%85%A5%E5%85%B3%E7%B3%BB
  @Column({
    nullable: false,
    default: 14,
    comment: '用户角色值',
    name: 'role_id',
  })
  roleId: number

  // 设置了多对一的关系后 数据库表会生成一个 属性名+外表关联列名 的字段(这里是roleId) 可以使用@JoinColumn({ name: 'role_id' }) 起别名, 还可以使用第二个参数referencedColumnName 指定关联表的列, 默认是id
  @ManyToOne((type) => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: Role

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
