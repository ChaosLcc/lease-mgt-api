/**
 * @name: role.dto
 * @author: liubi_chaos_g
 * @date: 2021-12-22 10:49
 * @description：role.dto
 * @update: 2021-12-22 10:49
 */
import { ContentDto } from '../../content/dto/content.dto'
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RoleItemDto extends ContentDto {
  @ApiProperty({ description: '角色名称', example: 'Admin' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  @IsString({ message: '角色名称必须是 String 类型' })
  roleName: string

  @ApiPropertyOptional({ description: '角色值' })
  roleValue: string

  @ApiProperty({ description: '角色备注', example: '我是Admin' })
  remark: string

  @ApiProperty({ description: '角色状态 0-不可用 1-可用' })
  status: number
}

export class CreateRoleDto extends PickType(RoleItemDto, [
  'roleName',
  'remark',
]) {}

export class UpdateRoleDto extends PickType(RoleItemDto, [
  'id',
  'roleName',
  'remark',
]) {}
