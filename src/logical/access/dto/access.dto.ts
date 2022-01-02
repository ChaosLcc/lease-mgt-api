import { ContentDto } from '../../content/dto/content.dto'
import { IsNotEmpty } from 'class-validator'

export class AccessItemDto extends ContentDto {
  /**
   * 模块名称
   * @example 菜单管理
   */
  @IsNotEmpty({ message: '模块名称不能为空' })
  moduleName: string

  /**
   * 操作名称
   * @example 增加菜单
   */
  @IsNotEmpty({ message: '操作名称不能为空' })
  actionName: string

  /**
   * 节点类型 1-模块 2-菜单 3-操作
   */
  @IsNotEmpty({ message: '节点类型不能为空' })
  type: number

  /**
   * 路由跳转地址
   */
  @IsNotEmpty({ message: '路由跳转地址不能为空' })
  url: string

  /**
   * 模块Id, 与id关联
   */
  moduleId: number

  /**
   * 排序
   */
  order: number

  /**
   * 描述
   */
  description: string

  /**
   * 状态 0-不可用 1-可用
   */
  status: number
}
export type CreateAccessDto = AccessItemDto

export type UpdateAccessDto = AccessItemDto
