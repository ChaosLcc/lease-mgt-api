/**
 * @name: user.dto
 * @author: liubi_chaos_g
 * @date: 2021-12-21 10:12
 * @description：user.dto
 * @update: 2021-12-21 10:12
 */
import { PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { ContentDto } from '../../content/dto/content.dto'
import { RoleItemDto } from '../../role/dto/role.dto'

export class UserItemDto extends ContentDto {
  /**
   * 用户名
   * @example Chaos
   */
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是 String 类型' })
  username?: string

  /**
   * 邮箱
   */
  email?: string

  /**
   * 昵称
   */
  nickname?: string

  /**
   * 角色值
   */
  roleId: number

  role: RoleItemDto

  /**
   * 备注
   */
  remark: string

  /**
   * 用户状态: 1-可用 0-不可用
   */
  status: number

  /**
   * 手机号
   * @example 18383838383
   */
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string

  /**
   * 真实姓名
   * @example: '郭百万'
   */
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  trueName: string
}

export class UpdateUserDto extends OmitType(UserItemDto, ['id']) {}

export class RegisterDto extends PickType(UserItemDto, [
  'username',
  'phone',
  'trueName',
]) {
  /**
   * 密码
   * @example 666666
   */
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  /**
   * 重复密码
   * @example 666666
   */
  @IsNotEmpty({ message: '重复密码不能为空' })
  repassword: string

  /**
   * 密码盐
   */
  passwordSalt?: string
}

export class LoginDto extends PickType(RegisterDto, ['username', 'password']) {}

export type CreateUserDto = RegisterDto
