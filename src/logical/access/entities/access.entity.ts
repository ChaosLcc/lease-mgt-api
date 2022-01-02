import { Content } from '../../content/entities/content.entity'
import { Column } from 'typeorm/browser'

export class Access extends Content {
  @Column({
    nullable: false,
    default: '',
    name: 'module_name',
    comment: '模块名称',
  })
  moduleName: string

  @Column({
    nullable: false,
    default: '',
    name: 'action_name',
    comment: '操作名称',
  })
  actionName: string

  @Column({
    nullable: false,
    comment: '节点类型 1-模块 2-菜单 3-操作',
  })
  type: number

  @Column({
    nullable: false,
    comment: '路由跳转地址',
  })
  url: string

  @Column({
    nullable: false,
    name: 'module_id',
    comment: '此moduleID和ID关联, module_id = 0 表示模块',
  })
  moduleId: number

  @Column({
    nullable: true,
    default: 10,
    comment: '排序',
  })
  order: number

  @Column({
    nullable: false,
    default: '',
    comment: '描述',
  })
  description: string

  @Column({
    nullable: false,
    default: 1,
    comment: '状态 1-可用 0-不可用',
  })
  status: number
}
