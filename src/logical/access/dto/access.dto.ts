import { ContentDto } from '../../content/dto/content.dto'
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'
import { OmitType, PartialType, PickType } from '@nestjs/swagger'

export class AccessItemDto extends ContentDto {
  /**
   * 模块名称
   * @example 菜单管理
   */
  moduleName?: string

  /**
   * 操作名称
   * @example 增加菜单
   */
  actionName?: string

  /**
   * 节点类型 1-模块 2-菜单 3-操作
   */
  @IsNotEmpty({ message: '节点类型不能为空' })
  @IsNumberString({}, { message: 'type必须是number类型' })
  type?: number

  /**
   * 路由跳转地址
   */
  @IsNotEmpty({ message: '路由跳转地址不能为空' })
  url?: string

  /**
   * 模块Id, 与id关联
   */
  @IsNumberString({}, { message: 'moduleId必须是number类型' })
  moduleId?: number

  /**
   * 排序
   */
  order?: number

  /**
   * 描述
   */
  description?: string

  /**
   * 状态 0-不可用 1-可用
   */
  status?: number
}

export class CreateAccessDto extends PickType(AccessItemDto, [
  'moduleName',
  'moduleId',
  'actionName',
  'url',
  'type',
  'order',
]) {}

export type UpdateAccessDto = AccessItemDto
